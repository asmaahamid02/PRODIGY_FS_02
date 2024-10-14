import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { loginValidationSchema } from '@staffsphere/shared/src/validations/auth.validations'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectStatus } from '../features/auth/redux/authSelectors'
import { login } from '../features/auth/redux/authActions'
import { errorMessage } from '../utils/error.utils'
import { ILoginRequest } from '@staffsphere/shared/src/types/requests.types'

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)

  const handleSubmit = async (
    values: ILoginRequest,
    { setSubmitting }: FormikHelpers<ILoginRequest>
  ) => {
    setSubmitting(true)

    try {
      await dispatch(login(values)).unwrap()
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error)
      toast({
        title: errorMessage(error),
        status: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box
      w='full'
      maxW='xl'
      p={8}
      mt={10}
      boxShadow='xl'
      borderRadius='md'
      bg='white'
    >
      <Heading mb={6} textAlign='center' size='lg' color='purple.500'>
        Login
      </Heading>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <VStack spacing={4}>
              {/* Email Field */}
              <Field name='email'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input
                      {...field}
                      id='email'
                      placeholder='Enter your email'
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Password Field */}
              <Field name='password'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                      />
                      <InputRightElement
                        cursor={'pointer'}
                        color={'gray.500'}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Submit Button */}
              <Button
                type='submit'
                colorScheme='purple'
                isLoading={props.isSubmitting || status === 'loading'}
                width='full'
              >
                Login
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default LoginScreen
