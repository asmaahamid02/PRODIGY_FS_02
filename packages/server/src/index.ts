import express, { Response } from 'express'
import dotenv from 'dotenv'
import redisClient from './utils/connectRedis'
import { PrismaClient } from '@prisma/client'
import http from 'http'
import helmet from 'helmet'
import cors from 'cors'

dotenv.config()

const prisma = new PrismaClient()
const app = express()
const server = http.createServer(app)

async function bootstrap() {
  app.use(helmet())
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  )
  app.use(express.json())

  app.get('/api/redis-health-checker', async (_, res: Response) => {
    const message = await redisClient.get('try')
    res.status(200).json({
      status: 'success',
      message,
    })
  })

  const port = process.env.PORT || 8000
  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

bootstrap()
  .catch((error) => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
