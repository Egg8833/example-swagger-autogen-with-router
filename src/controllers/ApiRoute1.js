const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authorize = require('../middlewares/auth')

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'

/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *       - User
 *     summary: 用戶登入
 *     description: 用戶登入
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: 登入成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   example: []
 *                 token:
 *                   type: string
 *                   example: jwt_token
 *                 message:
 *                   type: string
 *                   example: Authentication successed
 *       401:
 *         description: 登入失敗
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
 *                   example: Authentication failed
 */
router.post('/signin', (req, res) => {
  const { username, password } = req.body || {}

  if (!username || !password) {
    return res.status(401).json({
      data: [],
      message: 'Authentication failed',
    })
  }

  // 模擬登入成功
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })

  res.status(201).json({
    data: [],
    token,
    message: 'Authentication successed',
  })
})

// 之後的路由都需要驗證 token
router.use(authorize)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: 取得特定使用者
 *     description: 取得特定使用者
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 使用者 ID
 *     responses:
 *       200:
 *         description: 成功取得使用者
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: Successfully found
 *       401:
 *         description: 未授權
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication failed!
 *       404:
 *         description: 找不到使用者
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
 *                   example: User not found
 */
router.get('/users/:id', (req, res) => {
  const mockUsers = [
    { id: '1', name: 'Jhon Doe', age: 29 },
    { id: '2', name: 'Jane Doe', age: 25 },
  ]

  const user = mockUsers.find(u => u.id === req.params.id)

  if (!user) {
    return res.status(404).json({
      data: [],
      message: 'User not found',
    })
  }

  res.status(200).json({
    data: user,
    message: 'Successfully found',
  })
})

module.exports = router
