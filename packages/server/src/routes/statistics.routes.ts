import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { getStatistics } from '../controllers/statistics.controller'

const router = Router()

router.get('/', authMiddleware, getStatistics)
export default router
