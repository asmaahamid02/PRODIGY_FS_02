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
    const employees = await prisma.employee.findMany({
      include: {
        user: true,
        department: true,
        role: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        { user: { firstName: 'asc' } },
        { user: { lastName: 'asc' } },
      ],
    })

    res.status(200).json({ data: { employees } })
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
      where: { email: { equals: email, mode: 'insensitive' } },
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
        departmentId,
        roleId,
        jobTitle,
        hireDate: new Date(hireDate),
        salary,
        managerId,
        phone,
      },
      include: {
        user: true,
        department: true,
        role: true,
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
        user: true,
        department: true,
        role: true,
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
