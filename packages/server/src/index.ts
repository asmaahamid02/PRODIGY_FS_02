import express, { Response } from 'express'
import dotenv from 'dotenv'
import redisClient from './utils/connectRedis'
import { PrismaClient } from '@prisma/client'
import helmet from 'helmet'
import cors from 'cors'
import rootRoutes from './routes'
import { errorHandler } from './middlewares/errors.middleware'
import cookieParser from 'cookie-parser'
import { $Enums } from '@prisma/client'

dotenv.config()

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string
      email: string
      role: $Enums.RoleEnum
    }
  }
}

const corsOptions: cors.CorsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

export const prisma = new PrismaClient(/*{ log: ['query'] }*/)
const app = express()

async function bootstrap() {
  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(cookieParser())

  app.get('/', (_, res) => {
    res.send('Server is running!')
  })

  app.get('/api/redis-health-checker', async (_, res: Response) => {
    const message = await redisClient.get('try')
    res.status(200).json({
      status: 'success',
      message,
    })
  })

  //routes
  app.use('/api', rootRoutes)

  //error handler
  app.use(errorHandler)

  const port = process.env.PORT || 8000
  app.listen(port, () => {
    const message = `Server running on ${process.env.APP_URL}${
      process.env.NODE_ENV === 'development' ? `:${port}` : ''
    }`
    console.log(message)
  })
}

bootstrap()
  .catch((error) => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
