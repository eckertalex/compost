import express from 'express'
import {validate} from '../../middlewares/validate'
import * as listValidation from '../../validations/list.validation'
import * as listController from '../../controllers/list.controller'

const router = express.Router()

router
  .route('/lists')
  .get(validate(listValidation.getLists), listController.getLists)
  .post(validate(listValidation.createList), listController.createList)

router
  .route('/lists/:listUuid')
  .get(validate(listValidation.getList), listController.getList)
  .patch(validate(listValidation.updateList), listController.updateList)
  .delete(validate(listValidation.deleteList), listController.deleteList)

export const listsRoute = router

/**
 * @swagger
 * tags:
 *   name: Lists
 *   description: Lists management and retrieval
 */

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists
 *     description:
 *     tags: [Lists]
 *     parameters:
 *       - $ref: '#/components/parameters/orderByListParam'
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
 *                     $ref: '#/components/schemas/List'
 *                 skip:
 *                   type: integer
 *                   example: 0
 *                 take:
 *                   type: integer
 *                   example: 10
 *
 *   post:
 *     summary: Create a list
 *     description:
 *     tags: [Lists]
 *     requestBody:
 *       $ref: '#/components/requestBodies/ListBody'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/List'
 */

/**
 * @swagger
 * /lists/{listUuid}:
 *   get:
 *     summary: Get a list
 *     description:
 *     tags: [Lists]
 *     parameters:
 *       - $ref: '#/components/parameters/listUuidParam'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/List'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a list
 *     description:
 *     tags: [Lists]
 *     parameters:
 *       - $ref: '#/components/parameters/listUuidParam'
 *     requestBody:
 *       $ref: '#/components/requestBodies/ListBody'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/List'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a list
 *     description:
 *     tags: [Lists]
 *     parameters:
 *       - $ref: '#/components/parameters/listUuidParam'
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
