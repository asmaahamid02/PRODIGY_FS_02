import { roleValidationSchema } from '@staffsphere/shared/src/validations/role.validations'
import { Router } from 'express'
import { validateRequest } from '../middlewares/validation.middleware'
import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from '../controllers/role.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { isAdmin } from '../middlewares/isAdmin.middleware'

const router = Router()

router.get('/', authMiddleware, isAdmin, getRoles)
router.post(
  '/',
  authMiddleware,
  isAdmin,
  validateRequest(roleValidationSchema),
  createRole
)
router.put(
  '/:id',
  authMiddleware,
  isAdmin,
  validateRequest(roleValidationSchema),
  updateRole
)
router.delete('/:id', authMiddleware, isAdmin, deleteRole)

export default router
