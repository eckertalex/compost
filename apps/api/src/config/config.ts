import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'

dotenv.config({path: path.join(__dirname, '../../.env')})

type EnvVars = {
  NODE_ENV: 'production' | 'development' | 'test'
  PORT: number
  DATABASE_URL: string
}

const envVarsSchema = Joi.object<EnvVars>()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required(),
  })
  .unknown()

const {value: envVars, error} = envVarsSchema
  .prefs({errors: {label: 'key'}})
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
}
