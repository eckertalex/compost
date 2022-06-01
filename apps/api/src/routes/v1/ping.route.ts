import express from 'express'

const router = express.Router()

router.route('/').get((_req, res) => {
  return res.json({message: 'pong'})
})

export const pingRoute = router

/**
 * @swagger
 * tags:
 *   name: Ping
 *   description: Ping routes
 */

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Check health
 *     description: Server responds with pong
 *     tags: [Ping]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
