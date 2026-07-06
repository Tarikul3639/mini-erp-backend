/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Global search APIs
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Global search
 *     description: Search products, customers and sales by keyword.
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         example: laptop
 *     responses:
 *       200:
 *         description: Search results returned successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

export {};