const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authorize = require('../middlewares/auth')

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'

/**
 * @route POST /signin
 * @desc 登入 API，不需要驗證 token
 */
router.post(
  '/signin',
  /*  #swagger.tags = ['User']
      #swagger.description = '用戶登入'
      #swagger.parameters['body'] = {
          in: 'body',
          description: '使用者登入資料',
          required: true,
          schema: {
              $username: 'johndoe',
              $password: '123456'
          }
      }
      #swagger.responses[201] = {
          description: '登入成功',
          schema: {
              data: [],
              token: 'jwt_token',
              message: 'Authentication successed'
          }
      }
      #swagger.responses[401] = {
          description: '登入失敗',
          schema: {
              data: [],
              message: 'Authentication failed'
          }
      }
  */
  (req, res) => {
    const {username, password} = req.body || {}

    if (!username || !password) {
      return res.status(401).json({
        data: [],
        message: 'Authentication failed',
      })
    }

    // 模擬登入成功
    const token = jwt.sign({username}, JWT_SECRET, {expiresIn: '1h'})

    res.status(201).json({
      data: [],
      token,
      message: 'Authentication successed',
    })
  }
)

// ✅ 從這裡開始全部需要驗證 token
router.use(authorize)

/**
 * @route GET /users/:id
 * @desc 取得特定用戶資料（需要 token）
 */
router.get(
  '/users/:id',
  /*  #swagger.tags = ['User']
      #swagger.description = '取得特定使用者'
      #swagger.parameters['id'] = {
          in: 'path',
          description: '使用者 ID',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
          schema: { "$ref": "#/definitions/User" },
          description: "成功取得使用者"
      }
      #swagger.responses[401] = {
          description: '未授權',
          schema: { message: 'Authentication failed!' }
      }
      #swagger.responses[404] = {
          description: '找不到使用者',
          schema: { data: [], message: 'User not found' }
      }
  */
  (req, res) => {
    const mockUsers = [
      {id: '1', name: 'Jhon Doe', age: 29},
      {id: '2', name: 'Jane Doe', age: 25},
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
  }
)

module.exports = router
