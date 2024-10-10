import { loginValidationSchema } from '@staffsphere/shared/src/validations/auth.validations'
import { Router } from 'express'
import { validateRequest } from '../middlewares/validation.middleware'
import { login, logout } from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/login', validateRequest(loginValidationSchema), login)
router.get('/logout', authMiddleware, logout)
export default router
