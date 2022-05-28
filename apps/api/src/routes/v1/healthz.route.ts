import express from 'express'

const router = express.Router()

router.route('/').get((_req, res) => {
  return res.json({ok: true})
})

router.route('/message/:name').get((req, res) => {
  return res.json({message: `hello ${req.params.name}`})
})

export const healthzRoute = router

/**
 * @swagger
 * tags:
 *   name: Healthz
 *   description: Healthz routes
 */

/**
 * @swagger
 * /healthz:
 *   get:
 *     summary: Check health
 *     description: Usable to check health of api server
 *     tags: [Healthz]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 */

/**
 * @swagger
 * /healthz/message/{name}:
 *   get:
 *     summary: Say hello
 *     description: Server will say hello back to name
 *     tags: [Healthz]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           minimum: 1
 *         description: The name
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
