import express from 'express'
import {pingRoute} from './ping.route'
import {docsRoute} from './docs.route'
import {tasksRoute} from './task.route'
import {listsRoute} from './list.route'
import {config} from '../../config/config'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/ping',
    route: pingRoute,
  },
  {
    path: '/',
    route: listsRoute,
  },
  {
    path: '/',
    route: tasksRoute,
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
