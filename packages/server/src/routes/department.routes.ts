import {
  departmentUpdateValidationSchema,
  departmentValidationSchema,
} from '@staffsphere/shared/src/validations/department.validations'
import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { isAdmin } from '../middlewares/isAdmin.middleware'
import { validateRequest } from '../middlewares/validation.middleware'
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from '../controllers/department.controller'

const router = Router()

router.get('/', authMiddleware, isAdmin, getDepartments)
router.post(
  '/',
  authMiddleware,
  isAdmin,
  validateRequest(departmentValidationSchema),
  createDepartment
)
router.put(
  '/:id',
  authMiddleware,
  isAdmin,
  validateRequest(departmentUpdateValidationSchema),
  updateDepartment
)
router.delete('/:id', authMiddleware, isAdmin, deleteDepartment)

export default router
