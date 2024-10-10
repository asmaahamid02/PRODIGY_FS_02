import { ValidationError } from 'yup'

export const getValidationErrors = (error: ValidationError) =>
  error.inner.map((e) => ({
    message: e.message,
    field: e.path,
  }))
