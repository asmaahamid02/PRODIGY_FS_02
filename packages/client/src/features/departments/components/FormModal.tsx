import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from '@chakra-ui/react'
import { IDepartmentRequest } from '@staffsphere/shared/src/types/requests.types'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { FC } from 'react'
import { QUERY_KEYS } from '../../../utils/constants.utils'
import useGlobalMutation from '../../../hooks/useGlobalMutation'
import useValidateQuery from '../../../hooks/useValidateQuery'
import { IDepartment } from '@staffsphere/shared/src/types/department.types'
import { departmentValidationSchema } from '@staffsphere/shared/src/validations/department.validations'
import { addRecord, updateRecord } from '../services'
import { getAll } from '../../employees/services'
import { useQuery } from '@tanstack/react-query'

type TProps = {
  isOpen: boolean
  onClose: () => void
  record?: IDepartment
}

const initialValues: IDepartmentRequest = {
  name: '',
  budget: 0,
  managerId: '',
}

const FormModal: FC<TProps> = ({ isOpen, onClose, record }) => {
  const toast = useToast()
  const { validateQuery } = useValidateQuery()

  const { mutate, isPending } = useGlobalMutation({
    mutationFn: (data: IDepartmentRequest) =>
      record ? updateRecord(data, record.id) : addRecord(data),
    onSuccess: async () => {
      validateQuery([QUERY_KEYS.DEPARTMENTS])
      setTimeout(() => {
        onClose()
      }, 500)

      toast({
        title: record ? 'Department updated' : 'Department created',
        status: 'success',
      })
    },
  })

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.EMPLOYEES, 'get-all'],
    queryFn: () => getAll(),
  })

  const handleSubmit = async (
    values: IDepartmentRequest,
    { setSubmitting }: FormikHelpers<IDepartmentRequest>
  ) => {
    setSubmitting(true)
    mutate(values)
    setSubmitting(false)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {' '}
            {record ? 'Update' : 'Create new'} department
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={
                record
                  ? {
                      name: record.name,
                      budget: record.budget,
                      managerId: record.managerId ?? '',
                    }
                  : initialValues
              }
              validationSchema={departmentValidationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name='name'>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input {...field} id='name' placeholder='Enter name' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='budget'>
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={form.errors.budget && form.touched.budget}
                      >
                        <FormLabel htmlFor='budget'>Budget ($)</FormLabel>
                        <Input
                          {...field}
                          id='budget'
                          type='number'
                          placeholder='Enter budget'
                        />
                        <FormErrorMessage>
                          {form.errors.budget}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='managerId'>
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={
                          form.errors.managerId && form.touched.managerId
                        }
                      >
                        <FormLabel htmlFor='managerId'>Manager</FormLabel>
                        <Select {...field} id='managerId'>
                          {data && data.data.employees.length > 0 ? (
                            <>
                              <option value={''}>Select manager</option>
                              {data.data.employees.map((employee) => (
                                <option
                                  key={employee.id}
                                  value={employee.id}
                                >{`${employee.user.firstName} ${employee.user.lastName}`}</option>
                              ))}
                            </>
                          ) : (
                            <option value=''>No managers</option>
                          )}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.managerId}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <ModalFooter px={0}>
                    <Button
                      colorScheme='purple'
                      mr={3}
                      type='submit'
                      disabled={isSubmitting || isPending || isLoading}
                      isLoading={isSubmitting || isPending}
                    >
                      {record ? 'Update' : 'Add'}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FormModal
