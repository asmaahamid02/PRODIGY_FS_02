import { Router } from 'express'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import roleRoutes from './role.routes'
import departmentRoutes from './department.routes'
import employeeRoutes from './employee.routes'
import statisticsRoutes from './statistics.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/roles', roleRoutes)
router.use('/departments', departmentRoutes)
router.use('/employees', employeeRoutes)
router.use('/statistics', statisticsRoutes)

export default router
