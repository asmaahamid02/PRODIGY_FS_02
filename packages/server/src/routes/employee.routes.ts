import { employeeValidationSchema } from '@staffsphere/shared/src/validations/employee.validations'
import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { isAdmin } from '../middlewares/isAdmin.middleware'
import { validateRequest } from '../middlewares/validation.middleware'
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from '../controllers/employee.controller'

const router = Router()

router.get('/', authMiddleware, isAdmin, getEmployees)
router.get('/show/:id', authMiddleware, getEmployee)
router.post(
  '/',
  authMiddleware,
  isAdmin,
  validateRequest(employeeValidationSchema),
  createEmployee
)
router.put('/:id', authMiddleware, isAdmin, updateEmployee)
router.delete('/:id', authMiddleware, isAdmin, deleteEmployee)
export default router
