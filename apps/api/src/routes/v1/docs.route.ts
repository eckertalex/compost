import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {swaggerDef} from '../../docs/swagger-def'

const router = express.Router()

const specs = swaggerJsdoc({
  swaggerDefinition: swaggerDef,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.ts'],
})

router.use('/', swaggerUi.serve)
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
)

export const docsRoute = router
