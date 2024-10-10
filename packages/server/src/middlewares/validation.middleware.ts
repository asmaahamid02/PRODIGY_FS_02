import { getValidationErrors } from '@staffsphere/shared/src/validations'
import { NextFunction, Request, Response } from 'express'
import { AnySchema, ValidationError as yupValidationError } from 'yup'
import ValidationError from '../errors/validationError'

export const validateRequest = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body using the provided schema
      await schema.validate(req.body, { abortEarly: false })
      next() // If validation passes, move to the next middleware
    } catch (error) {
      if (error instanceof yupValidationError) {
        const validationErrors = getValidationErrors(error)
        next(new ValidationError({ errors: validationErrors }))
      }
      next(error)
    }
  }
}
