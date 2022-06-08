import express from 'express'
import {validate} from '../../middlewares/validate'
import * as taskValidation from '../../validations/task.validation'
import * as taskController from '../../controllers/task.controller'

const router = express.Router()

router
  .route('/tasks')
  // Get all tasks
  .get(validate(taskValidation.getTasks), taskController.getTasks)
  // Create a task
  .post(validate(taskValidation.createTask), taskController.createTask)

router
  .route('/tasks/:taskUuid')
  // Get a task
  .get(validate(taskValidation.getTask), taskController.getTask)
  // Update a task
  .patch(validate(taskValidation.updateTask), taskController.updateTask)
  // Delete a task
  .delete(validate(taskValidation.deleteTask), taskController.deleteTask)

router
  .route('/lists/:listUuid/tasks')
  // Get all tasks
  .get(validate(taskValidation.getListTasks), taskController.getListTasks)

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
 *       - $ref: '#/components/parameters/orderByTaskParam'
 *       - $ref: '#/components/parameters/sortOrderParam'
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
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
 *   post:
 *     summary: Create a task
 *     description:
 *     tags: [Tasks]
 *     requestBody:
 *       $ref: '#/components/requestBodies/TaskBody'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Task'
 */

/**
 * @swagger
 * /tasks/{taskUuid}:
 *   get:
 *     summary: Get a task
 *     description:
 *     tags: [Tasks]
 *     parameters:
 *       - $ref: '#/components/parameters/taskUuidParam'
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
 *   patch:
 *     summary: Update a task
 *     description:
 *     tags: [Tasks]
 *     parameters:
 *       - $ref: '#/components/parameters/taskUuidParam'
 *     requestBody:
 *       $ref: '#/components/requestBodies/TaskBody'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Task'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a task
 *     description:
 *     tags: [Tasks]
 *     parameters:
 *       - $ref: '#/components/parameters/taskUuidParam'
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /lists/{listUuid}/tasks:
 *   get:
 *     summary: Get all tasks from a list
 *     description:
 *     tags: [Tasks]
 *     parameters:
 *       - $ref: '#/components/parameters/listUuidParam'
 *       - $ref: '#/components/parameters/orderByTaskParam'
 *       - $ref: '#/components/parameters/sortOrderParam'
 *       - $ref: '#/components/parameters/skipParam'
 *       - $ref: '#/components/parameters/takeParam'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 skip:
 *                   type: integer
 *                   example: 0
 *                 take:
 *                   type: integer
 *                   example: 10
 */
