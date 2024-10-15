import * as yup from 'yup'
export const employeeValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(3),
  lastName: yup.string().required('Last name is required').min(3),
  email: yup.string().required('Email is required').email(),
  phone: yup.string().optional().min(10),
  hireDate: yup.date().required('Hire date is required'),
  jobTitle: yup.string().required('Job title is required').min(3),
  salary: yup.number().required('Salary is required').moreThan(0),
  roleId: yup.string().required('Role is required'),
  managerId: yup.string().optional(),
  departmentId: yup.string().optional(),
})
