import * as yup from 'yup'

export const roleValidationSchema = yup.object().shape({
  title: yup.string().required('Role title is required').min(3).max(50),
  description: yup.string().optional().max(255),
})
