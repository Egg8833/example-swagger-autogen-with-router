const express = require('express')
const router = express.Router()
const authorize = require('../middlewares/auth')

/**
 * @swagger
 * /test-get:
 *   get:
 *     tags:
 *       - User
 *     summary: 測試取得
 *     description: Description here...
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: Successfully found
 */
router.route('/test-get').get(authorize, (req, res, next) => {
    res.status(200).json({
        data: [],
        message: 'Successfully found'
    })
})

/**
 * @swagger
 * /test-delete/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: 測試刪除
 *     description: 刪除測試
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 測試 ID
 *     responses:
 *       200:
 *         description: Delete!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: Delete!
 */
router.route('/test-delete/:id').delete(authorize, async (req, res, next) => {
    res.status(200).json({
        msg: [],
        message: 'Delete!'
    })
})

module.exports = router