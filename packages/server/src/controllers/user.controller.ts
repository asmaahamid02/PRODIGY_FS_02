import { IAdminRequest } from '@staffsphere/shared/src/types/requests.types'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '..'
import NotFoundError from '../errors/notFoundError'
import { hashSync } from 'bcryptjs'
import UnauthenticatedError from '../errors/unauthenticatedError'

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password }: IAdminRequest = req.body

    const existedUser = await prisma.user.findFirst({
      where: { email },
    })

    if (existedUser) {
      throw new NotFoundError({ errors: [{ message: 'User already exists' }] })
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashSync(password, 10),
      },
      select: {
        password: false,
      },
    })

    res
      .status(201)
      .json({ message: 'Admin created successfully', data: { user: newUser } })
  } catch (error) {
    next(error)
  }
}

export const user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user?.id

    if (!id) {
      throw new UnauthenticatedError()
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, firstName: true, lastName: true, role: true },
    })

    if (!user) {
      throw new NotFoundError({ errors: [{ message: 'User not found' }] })
    }

    res.status(200).json({ data: { user } })
  } catch (error) {
    next(error)
  }
}
