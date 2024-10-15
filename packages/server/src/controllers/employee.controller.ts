import { NextFunction, Request, Response } from 'express'
import { prisma } from '..'
import { IEmployeeRequest } from '@staffsphere/shared/src/types/requests.types'
import BadRequestError from '../errors/badReqError'
import { hashSync } from 'bcryptjs'

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, per_page = 10, paginated = false } = req.query

    const employees = await prisma.employee.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        role: {
          select: {
            title: true,
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
      orderBy: [
        {
          createdAt: 'desc',
        },
        { user: { firstName: 'asc' } },
        { user: { lastName: 'asc' } },
      ],
      skip: paginated ? (Number(page) - 1) * Number(per_page) : 0,
      take: paginated ? Number(per_page) : undefined,
    })

    let total = 0,
      totalPages = 0
    if (paginated) {
      total = await prisma.employee.count()
      totalPages = Math.ceil(total / Number(per_page))
    }

    res.status(200).json({
      data: { employees },
      meta: {
        total,
        totalPages,
        nextPage: totalPages > Number(page) ? Number(page) + 1 : null,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      jobTitle,
      phone,
      hireDate,
      salary,
      roleId,
      managerId,
      departmentId,
    }: IEmployeeRequest = req.body

    const existedEmployee = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: email, mode: 'insensitive' } },
          // {"employee.phone": { equals: phone, mode: 'insensitive' }},
        ],
      },
    })

    if (existedEmployee) {
      throw new BadRequestError({
        errors: [{ message: 'Employee already exists' }],
      })
    }

    const employee = await prisma.employee.create({
      data: {
        user: {
          create: {
            firstName,
            lastName,
            email,
            password: hashSync('Password123', 10),
            role: 'user',
          },
        },
        departmentId: departmentId || null,
        roleId,
        jobTitle,
        hireDate: new Date(hireDate),
        salary,
        managerId: managerId || null,
        phone: phone || null,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        role: {
          select: {
            title: true,
          },
        },
      },
    })

    res.status(201).json({
      message: 'Employee created successfully',
      data: { employee },
    })
  } catch (error) {
    next(error)
  }
}

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const {
      firstName,
      lastName,
      email,
      jobTitle,
      phone,
      hireDate,
      salary,
      roleId,
      managerId,
      departmentId,
    }: IEmployeeRequest = req.body

    if (
      !firstName &&
      !lastName &&
      !email &&
      !jobTitle &&
      !phone &&
      !hireDate &&
      !salary &&
      !roleId &&
      !departmentId &&
      !managerId
    ) {
      {
        throw new BadRequestError({
          errors: [{ message: 'At least one field is required' }],
        })
      }
    }

    const existedEmployee = await prisma.employee.findUnique({ where: { id } })

    if (!existedEmployee) {
      throw new BadRequestError({
        errors: [{ message: 'Employee not found' }],
      })
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        user: {
          update: {
            firstName,
            lastName,
            email,
          },
        },
        roleId,
        jobTitle,
        hireDate: hireDate ? new Date(hireDate) : existedEmployee.hireDate,
        salary,
        phone: phone || null,
        managerId: managerId || null,
        departmentId: departmentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        role: {
          select: {
            title: true,
          },
        },
      },
    })

    res.status(200).json({
      message: 'Employee updated successfully',
      data: { employee: updatedEmployee },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const existedEmployee = await prisma.employee.findUnique({ where: { id } })

    if (!existedEmployee) {
      throw new BadRequestError({
        errors: [{ message: 'Employee not found' }],
      })
    }

    await prisma.employee.delete({
      where: { id },
    })

    res.status(200).json({
      message: 'Employee deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
