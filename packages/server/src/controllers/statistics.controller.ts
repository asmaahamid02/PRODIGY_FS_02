import { NextFunction, Request, Response } from 'express'
import { prisma } from '..'

const days = 30 * 24 * 60 * 60 * 1000
export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //total number of employees, roles and departments
    //total added employees, roles and departments in the last 30 days
    //total expenses in the last 30 days
    const totalEmployees = await prisma.employee.count()
    const totalRoles = await prisma.role.count()
    const totalDepartments = await prisma.department.count()

    const totalAddedEmployees = await prisma.employee.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - days),
        },
      },
    })
    const totalAddedRoles = await prisma.role.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - days),
        },
      },
    })
    const totalAddedDepartments = await prisma.department.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - days),
        },
      },
    })

    const totalExpenses = await prisma.department.aggregate({
      _sum: {
        budget: true,
      },
      where: {
        createdAt: {
          gte: new Date(Date.now() - days),
        },
      },
    })

    res.status(200).json({
      data: {
        totalEmployees,
        totalRoles,
        totalDepartments,
        totalAddedEmployees,
        totalAddedRoles,
        totalAddedDepartments,
        totalExpenses: totalExpenses._sum.budget,
      },
    })
  } catch (error) {
    next(error)
  }
}
