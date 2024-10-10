import { IDepartmentRequest } from '@staffsphere/shared/src/types/requests.types'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '..'
import NotFoundError from '../errors/notFoundError'
import BadRequestError from '../errors/badReqError'

export const getDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: 'asc' },
    })

    res.status(200).json({ data: { departments } })
  } catch (error) {
    next(error)
  }
}
export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, budget, managerId }: IDepartmentRequest = req.body

    const existedDepartment = await prisma.department.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    })

    if (existedDepartment) {
      throw new BadRequestError({
        errors: [{ message: 'Department already exists' }],
      })
    }

    if (managerId) {
      const manager = await prisma.user.findUnique({ where: { id: managerId } })
      if (!manager) {
        throw new NotFoundError({ errors: [{ message: 'Manager not found' }] })
      }
    }

    const newDepartment = await prisma.department.create({
      data: {
        name,
        budget,
        managerId,
      },
    })

    res.status(201).json({
      message: 'Department created successfully',
      data: { department: newDepartment },
    })
  } catch (error) {
    next(error)
  }
}

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { name, budget, managerId }: IDepartmentRequest = req.body

    if (!name && !budget && !managerId) {
      throw new BadRequestError({
        errors: [{ message: 'At least one field is required' }],
      })
    }

    const existedDepartment = await prisma.department.findUnique({
      where: { id },
    })

    if (!existedDepartment) {
      throw new NotFoundError({ errors: [{ message: 'Department not found' }] })
    }

    const dataToUpdate: { name?: string; budget?: number; managerId?: string } =
      {}

    if (name && name !== existedDepartment.name) {
      //check if the new name already exists
      const existedDepartmentName = await prisma.department.findFirst({
        where: { name: { equals: name, mode: 'insensitive' } },
      })

      if (existedDepartmentName && existedDepartmentName.id !== id) {
        throw new BadRequestError({
          errors: [{ message: 'Department already exists' }],
        })
      }

      dataToUpdate.name = name
    }

    if (budget && budget !== existedDepartment.budget) {
      dataToUpdate.budget = budget
    }

    if (managerId && managerId !== existedDepartment.managerId) {
      const manager = await prisma.user.findUnique({ where: { id: managerId } })
      if (!manager) {
        throw new NotFoundError({ errors: [{ message: 'Manager not found' }] })
      }

      dataToUpdate.managerId = managerId
    }

    //detect data changes
    if (Object.keys(dataToUpdate).length === 0) {
      res.status(200).json({
        message: 'No changes detected',
        data: { department: existedDepartment },
      })
      return
    }

    const updatedDepartment = await prisma.department.update({
      where: { id },
      data: {
        ...dataToUpdate,
      },
    })

    res.status(200).json({
      message: 'Department updated successfully',
      data: { department: updatedDepartment },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const existedDepartment = await prisma.department.findUnique({
      where: { id },
    })

    if (!existedDepartment) {
      throw new NotFoundError({ errors: [{ message: 'Department not found' }] })
    }

    await prisma.department.delete({
      where: { id },
    })

    res.status(200).json({
      message: 'Department deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
