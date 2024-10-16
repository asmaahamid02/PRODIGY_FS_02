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
    const { page = 1, per_page = 10, paginated = false } = req.query
    const isPaginated = Boolean(paginated)

    //get departments with employees, manager and employees count
    const departments = await prisma.department.findMany({
      orderBy: { name: 'asc' },
      include: {
        employees: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            manager: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        manager: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            employees: true,
          },
        },
      },
      skip: isPaginated ? (Number(page) - 1) * Number(per_page) : 0,
      take: isPaginated ? Number(per_page) : undefined,
    })

    let total = 0,
      totalPages = 0

    if (isPaginated) {
      total = await prisma.department.count()
      totalPages = Math.ceil(total / Number(per_page))
    }

    res.status(200).json({
      data: { departments },
      meta: {
        total,
        totalPages,
        nextPage: Number(page) < totalPages ? Number(page) + 1 : null,
      },
    })
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
        managerId: managerId || null,
      },
      include: {
        manager: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        employees: true,
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

    console.log('managerId: ', managerId)

    const updatedDepartment = await prisma.department.update({
      where: { id },
      data: {
        name,
        budget,
        managerId: managerId || null,
      },
      include: {
        manager: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        employees: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            manager: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            employees: true,
          },
        },
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
