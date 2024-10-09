import { NextFunction, Request, Response } from 'express'
import UnauthenticatedError from '../errors/unauthenticatedError'
import { TTokenPayload, verifyAccessToken } from '../utils/jwtHelper'
import { prisma } from '..'
import NotFoundError from '../errors/notFoundError'
import { TokenExpiredError } from 'jsonwebtoken'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken

    if (!token) {
      throw new UnauthenticatedError()
    }

    const isValid = verifyAccessToken(token)

    if (!isValid) {
      throw new UnauthenticatedError()
    }

    const user = await prisma.user.findUnique({
      where: {
        id: (isValid as TTokenPayload).id,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    })

    if (!user) {
      throw new NotFoundError({ errors: [{ message: 'User not found' }] })
    }

    req.user = user

    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new UnauthenticatedError({ errors: [{ message: 'Token expired' }] }))
    }

    next(error)
  }
}
