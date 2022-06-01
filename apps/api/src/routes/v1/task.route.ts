import express from 'express'
import * as taskController from '../../controllers/task.controller'
import * as taskValidation from '../../validations/task.validation'
import {validate} from '../../middlewares/validate'

const router = express.Router()

router
  .route('/')
  .get(validate(taskValidation.getTasks), taskController.getTasks)

router
  .route('/:uuid')
  .get(validate(taskValidation.getTask), taskController.getTask)

export const tasksRoute = router

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Tasks management and retrieval
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description:
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: How many to skip
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: How many to take
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
 *                     $ref: '#/components/schemas/Task'
 *                 skip:
 *                   type: integer
 *                   example: 0
 *                 take:
 *                   type: integer
 *                   example: 10
 *
 */

/**
 * @swagger
 * /tasks/{uuid}:
 *   get:
 *     summary: Get task with :uuid
 *     description:
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The uuid of the task
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */
