import { NextFunction, Request, Response } from 'express'
import UnauthenticatedError from '../errors/unauthenticatedError'
import UnauthorizedError from '../errors/unauthorizedError'

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.user?.role

    if (!role) {
      throw new UnauthenticatedError()
    }

    if (role !== 'admin') {
      throw new UnauthorizedError()
    }

    next()
  } catch (error) {
    next(error)
  }
}
