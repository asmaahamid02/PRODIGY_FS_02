import { Router } from 'express'
import { createAdmin, user } from '../controllers/user.controller'
import { validateRequest } from '../utils/validation'
import { adminValidationSchema } from '@staffsphere/shared/src/validations/auth.validations'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/admin', validateRequest(adminValidationSchema), createAdmin)
router.get('/user', authMiddleware, user)

export default router
