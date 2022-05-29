import express from 'express'
import {validate} from '../../middlewares/validate'
import * as todoValidation from '../../validations/todo.validation'
import * as todoController from '../../controllers/todo.controller'

const router = express.Router()

router
  .route('/')
  .get(validate(todoValidation.getTodos), todoController.getTodos)

export const todosRoute = router

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todos management and retrieval
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     description:
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Todo title
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Todo description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of todos
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */
