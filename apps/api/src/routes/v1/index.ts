import express from 'express'
import {healthzRoute} from './healthz.route'
import {docsRoute} from './docs.route'
import {config} from '../../config/config'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/healthz',
    route: healthzRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
]

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export const routes = router
