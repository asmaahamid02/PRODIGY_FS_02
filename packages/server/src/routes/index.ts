import { Router } from 'express'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import roleRoutes from './role.routes'
import departmentRoutes from './department.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/roles', roleRoutes)
router.use('/departments', departmentRoutes)

export default router
