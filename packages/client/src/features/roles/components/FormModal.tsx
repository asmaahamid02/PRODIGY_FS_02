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
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { IRoleRequest } from '@staffsphere/shared/src/types/requests.types'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { roleValidationSchema } from '@staffsphere/shared/src/validations/role.validations'
import { FC } from 'react'
import { addRecord, updateRecord } from '../services'
import { QUERY_KEYS } from '../../../utils/constants.utils'
import useGlobalMutation from '../../../hooks/useGlobalMutation'
import { IRole } from '@staffsphere/shared/src/types/role.types'
import useValidateQuery from '../../../hooks/useValidateQuery'

type TProps = {
  isOpen: boolean
  onClose: () => void
  record?: IRole
}

const initialValues: IRoleRequest = {
  title: '',
  description: '',
}

const FormModal: FC<TProps> = ({ isOpen, onClose, record }) => {
  const toast = useToast()
  const { validateQuery } = useValidateQuery()

  const { mutate, isPending } = useGlobalMutation({
    mutationFn: (data: IRoleRequest) =>
      record ? updateRecord(data, record.id) : addRecord(data),

    onSuccess: async () => {
      validateQuery([QUERY_KEYS.ROLES])
      setTimeout(() => {
        onClose()
      }, 500)

      toast({
        title: record ? 'Role updated' : 'Role created',
        status: 'success',
      })
    },
  })

  const handleSubmit = async (
    values: IRoleRequest,
    { setSubmitting }: FormikHelpers<IRoleRequest>
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
          <ModalHeader> {record ? 'Update' : 'Create new'} role</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={
                record
                  ? {
                      title: record.title,
                      description: record.description ?? '',
                    }
                  : initialValues
              }
              validationSchema={roleValidationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name='title'>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                      >
                        <FormLabel htmlFor='title'>Title</FormLabel>
                        <Input
                          {...field}
                          id='title'
                          placeholder='Enter role title'
                        />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='description'>
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel htmlFor='description'>Description</FormLabel>
                        <Textarea
                          {...field}
                          id='description'
                          placeholder='Enter role description'
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <ModalFooter px={0}>
                    <Button
                      colorScheme='purple'
                      mr={3}
                      type='submit'
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
