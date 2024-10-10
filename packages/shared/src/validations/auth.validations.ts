import * as Yup from 'yup'

export const adminValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').min(3),
  lastName: Yup.string().required('Last name is required').min(3),
  email: Yup.string().required('Email is required').email(),
  password: Yup.string()
    .required('Password is required')
    .min(8)
    .max(20)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase, one lowercase, one number, and one special character!'
    ),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
})

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email(),
  password: Yup.string().required('Password is required'),
})
