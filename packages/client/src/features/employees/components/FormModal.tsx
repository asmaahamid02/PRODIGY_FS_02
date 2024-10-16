import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
import { IEmployeeRequest } from '@staffsphere/shared/src/types/requests.types'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { FC } from 'react'
import { QUERY_KEYS } from '../../../utils/constants.utils'
import useGlobalMutation from '../../../hooks/useGlobalMutation'
import useValidateQuery from '../../../hooks/useValidateQuery'
import { employeeValidationSchema } from '@staffsphere/shared/src/validations/employee.validations'
import { addRecord, getAll, updateRecord } from '../services'
import { useQuery } from '@tanstack/react-query'
import { IEmployee } from '@staffsphere/shared/src/types/employee.types'
import { getAll as getRoles } from '../../roles/services'
import { getAll as getDepartments } from '../../departments/services'

type TProps = {
  isOpen: boolean
  onClose: () => void
  record?: IEmployee
}

const initialValues: IEmployeeRequest = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  hireDate: '',
  jobTitle: '',
  salary: 0,
  roleId: '',
  managerId: '',
  departmentId: '',
}

const FormModal: FC<TProps> = ({ isOpen, onClose, record }) => {
  const toast = useToast()
  const { validateQuery } = useValidateQuery()

  const { mutate, isPending } = useGlobalMutation({
    mutationFn: (data: IEmployeeRequest) =>
      record ? updateRecord(data, record.id) : addRecord(data),
    onSuccess: async () => {
      validateQuery([QUERY_KEYS.EMPLOYEES])
      setTimeout(() => {
        onClose()
      }, 500)

      toast({
        title: record ? 'Employee updated' : 'Employee created',
        status: 'success',
      })
    },
  })

  const { data: employees, isLoading: employeesLoading } = useQuery({
    queryKey: [QUERY_KEYS.EMPLOYEES, 'get-all'],
    queryFn: () => getAll(),
  })

  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: [QUERY_KEYS.ROLES, 'get-all'],
    queryFn: () => getRoles(),
  })

  const { data: departments, isLoading: departmentsLoading } = useQuery({
    queryKey: [QUERY_KEYS.DEPARTMENTS, 'get-all'],
    queryFn: () => getDepartments(),
  })

  const handleSubmit = async (
    values: IEmployeeRequest,
    { setSubmitting }: FormikHelpers<IEmployeeRequest>
  ) => {
    setSubmitting(true)
    mutate(values)
    setSubmitting(false)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick
        isCentered
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{record ? 'Update' : 'Create new'} employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={
                record
                  ? {
                      firstName: record.user.firstName,
                      lastName: record.user.lastName,
                      email: record.user.email,
                      phone: record.phone ?? '',
                      hireDate: record.hireDate
                        ? new Date(record.hireDate).toISOString().split('T')[0]
                        : '',
                      jobTitle: record.jobTitle,
                      salary: record.salary,
                      roleId: record.roleId ?? '',
                      managerId: record.managerId ?? '',
                      departmentId: record.departmentId ?? '',
                    }
                  : initialValues
              }
              validationSchema={employeeValidationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form>
                  <HStack>
                    <Field name='firstName'>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.firstName && form.touched.firstName
                          }
                        >
                          <FormLabel htmlFor='firstName'>First name</FormLabel>
                          <Input
                            {...field}
                            id='firstName'
                            placeholder='Enter first name'
                          />
                          <FormErrorMessage>
                            {form.errors.firstName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name='lastName'>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.lastName && form.touched.lastName
                          }
                        >
                          <FormLabel htmlFor='lastName'>Last name</FormLabel>
                          <Input
                            {...field}
                            id='lastName'
                            placeholder='Enter last name'
                          />
                          <FormErrorMessage>
                            {form.errors.lastName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>

                  <HStack>
                    <Field name='email'>
                      {({ field, form }) => (
                        <FormControl
                          mt={4}
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel htmlFor='email'>Email</FormLabel>
                          <Input
                            {...field}
                            id='email'
                            type='email'
                            placeholder='Enter email'
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name='phone'>
                      {({ field, form }) => (
                        <FormControl
                          mt={4}
                          isInvalid={form.errors.phone && form.touched.phone}
                        >
                          <FormLabel htmlFor='phone'>Phone</FormLabel>
                          <Input
                            {...field}
                            id='phone'
                            type='tel'
                            placeholder='Enter phone'
                          />
                          <FormErrorMessage>
                            {form.errors.phone}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>

                  <Field name='jobTitle'>
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={
                          form.errors.jobTitle && form.touched.jobTitle
                        }
                      >
                        <FormLabel htmlFor='jobTitle'>Job title</FormLabel>
                        <Input
                          {...field}
                          id='jobTitle'
                          placeholder='Enter job title'
                        />
                        <FormErrorMessage>
                          {form.errors.jobTitle}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <HStack>
                    <Field name='hireDate'>
                      {({ field, form }) => (
                        <FormControl
                          mt={4}
                          isInvalid={
                            form.errors.hireDate && form.touched.hireDate
                          }
                        >
                          <FormLabel htmlFor='hireDate'>Hire date</FormLabel>
                          <Input {...field} id='hireDate' type='date' />
                          <FormErrorMessage>
                            {form.errors.hireDate}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name='salary'>
                      {({ field, form }) => (
                        <FormControl
                          mt={4}
                          isInvalid={form.errors.salary && form.touched.salary}
                        >
                          <FormLabel htmlFor='salary'>Salary ($)</FormLabel>
                          <Input
                            {...field}
                            id='salary'
                            type='number'
                            placeholder='Enter salary'
                          />
                          <FormErrorMessage>
                            {form.errors.salary}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>

                  <Field name='departmentId'>
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={
                          form.errors.departmentId && form.touched.departmentId
                        }
                      >
                        <FormLabel htmlFor='departmentId'>Department</FormLabel>
                        <Select {...field} id='departmentId'>
                          {departments &&
                          departments.data.departments?.length > 0 ? (
                            <>
                              <option value={''}>Select department</option>
                              {departments.data.departments.map((row) => (
                                <option key={row.id} value={row.id}>
                                  {row.name}
                                </option>
                              ))}
                            </>
                          ) : (
                            <option value=''>No departments</option>
                          )}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.departmentId}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <HStack>
                    <Field name='roleId'>
                      {({ field, form }) => (
                        <FormControl
                          mt={4}
                          isInvalid={form.errors.roleId && form.touched.roleId}
                        >
                          <FormLabel htmlFor='roleId'>Role</FormLabel>
                          <Select {...field} id='roleId'>
                            {roles && roles.data.roles?.length > 0 ? (
                              <>
                                <option value={''}>Select role</option>
                                {roles.data.roles.map((row) => (
                                  <option key={row.id} value={row.id}>
                                    {row.title}
                                  </option>
                                ))}
                              </>
                            ) : (
                              <option value=''>No roles</option>
                            )}
                          </Select>
                          <FormErrorMessage>
                            {form.errors.roleId}
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
                          <Input {...field} id='managerId' as={Select}>
                            {employees &&
                            employees.data.employees?.length > 0 ? (
                              <>
                                <option value={''}>Select manager</option>
                                {employees.data.employees.map((employee) => (
                                  <option
                                    key={employee.id}
                                    value={employee.id}
                                  >{`${employee.user.firstName} ${employee.user.lastName}`}</option>
                                ))}
                              </>
                            ) : (
                              <option value=''>No managers</option>
                            )}
                          </Input>
                          <FormErrorMessage>
                            {form.errors.managerId}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>

                  <ModalFooter px={0}>
                    <Button
                      colorScheme='purple'
                      mr={3}
                      type='submit'
                      disabled={
                        isSubmitting ||
                        isPending ||
                        employeesLoading ||
                        departmentsLoading ||
                        rolesLoading
                      }
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
