/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sales management APIs
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - products
 *             properties:
 *               customer:
 *                 type: string
 *                 example: 6872dcb4a2c8d3b2f9d2b123
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: 6872dcb4a2c8d3b2f9d2b456
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Sale created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: john
 *     responses:
 *       200:
 *         description: Sales list returned successfully
 */

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get sale details
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6872dcb4a2c8d3b2f9d2b123
 *     responses:
 *       200:
 *         description: Sale details returned successfully
 *       404:
 *         description: Sale not found
 */

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Delete sale
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6872dcb4a2c8d3b2f9d2b123
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *       404:
 *         description: Sale not found
 */

export {};