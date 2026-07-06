/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics APIs
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Returns dashboard overview including statistics, revenue, recent sales, low stock products and top selling products.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

export {};