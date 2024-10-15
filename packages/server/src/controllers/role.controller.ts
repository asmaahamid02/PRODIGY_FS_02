import { IRoleRequest } from '@staffsphere/shared/src/types/requests.types'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '..'
import BadRequestError from '../errors/badReqError'

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description }: IRoleRequest = req.body

    const existedRole = await prisma.role.findFirst({
      where: { title: { equals: title, mode: 'insensitive' } },
    })

    if (existedRole) {
      throw new BadRequestError({
        errors: [{ message: 'Role already exists' }],
      })
    }

    const newRole = await prisma.role.create({
      data: {
        title,
        description,
      },
    })

    res
      .status(201)
      .json({ message: 'Role created successfully', data: { role: newRole } })
  } catch (error) {
    next(error)
  }
}

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { title, description }: IRoleRequest = req.body

    const existedRole = await prisma.role.findUnique({ where: { id } })

    if (!existedRole) {
      throw new BadRequestError({
        errors: [{ message: 'Role not found' }],
      })
    }

    //check if the new title already exists
    const existedTitle = await prisma.role.findFirst({
      where: { title: { equals: title, mode: 'insensitive' }, NOT: { id } },
    })

    if (existedTitle) {
      throw new BadRequestError({
        errors: [{ message: 'Role already exists' }],
      })
    }

    const updatedRole = await prisma.role.update({
      where: { id },
      data: {
        title,
        description: description || null,
      },
    })

    res.status(200).json({
      message: 'Role updated successfully',
      data: { role: updatedRole },
    })
  } catch (error) {
    next(error)
  }
}

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, per_page = 10 } = req.query

    const roles = await prisma.role.findMany({
      skip: (Number(page) - 1) * Number(per_page),
      take: Number(per_page),
      orderBy: { title: 'asc' },
    })

    const totalRoles = await prisma.role.count()
    const totalPages = Math.ceil(totalRoles / Number(per_page))

    res.status(200).json({
      data: { roles },
      meta: {
        total: totalRoles,
        totalPages,
        nextPage: totalPages > Number(page) ? Number(page) + 1 : null,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await prisma.role.delete({
      where: { id },
    })

    res.status(200).json({ message: 'Role deleted successfully' })
  } catch (error) {
    next(error)
  }
}
