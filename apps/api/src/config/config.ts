import dotenv from 'dotenv'
import path from 'path'
import {z} from 'zod'

dotenv.config({path: path.join(__dirname, '../../.env')})

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  PORT: z.string().min(1).default('3000'),
  DATABASE_URL: z.string().min(1),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  throw new Error(`Config validation error: ${result.error}`)
}

type Config = {
  env: 'production' | 'development' | 'test'
  port: string
  databaseUrl: string
}

export const config: Config = {
  env: result.data.NODE_ENV,
  port: result.data.PORT,
  databaseUrl: result.data.DATABASE_URL,
}
