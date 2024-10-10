import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/customError'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err
    if (logging) {
      console.error(
        JSON.stringify(
          {
            message: err.message,
            code: err.statusCode,
            errors: err.errors,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
          },
          null,
          2
        )
      )
    }

    res.status(statusCode).json({ errors })
    return
  }

  console.error(err)
  res.status(500).json({
    errors: [{ message: 'Internal Server Error, something went wrong!' }],
  })
}
