import * as yup from 'yup'

export const departmentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  budget: yup.number().required().moreThan(0),
  managerId: yup.string().optional(),
})
