import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL

const redisClient = createClient({
  url: redisUrl,
})

const connectRedis = async () => {
  try {
    await redisClient.connect()
    console.log('Redis client connected successfully')
    redisClient.set('try', 'Welcome to EXPRESS and TYPESCRIPT with PRISMA')
  } catch (error) {
    console.log('Redis error: ', error)
    setTimeout(connectRedis, 5000)
  }
}

connectRedis()

export default redisClient
