import { ILoginRequest } from '@staffsphere/shared/src/types/requests.types'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '..'
import NotFoundError from '../errors/notFoundError'
import { generateAccessToken } from '../utils/jwtHelper'
import { compareSync } from 'bcryptjs'
import BadRequestError from '../errors/badReqError'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: ILoginRequest = req.body

    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    })

    if (!user) {
      throw new NotFoundError({ errors: [{ message: 'User not found' }] })
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestError({
        errors: [{ message: 'Invalid credentials!' }],
      })
    }

    const token = generateAccessToken({ id: user.id, email: user.email })
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    res.status(200).json({ message: 'Logged in successfully' })
  } catch (error) {
    next(error)
  }
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('accessToken')
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
}
