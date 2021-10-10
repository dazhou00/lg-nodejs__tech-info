/**
 * 用户
 */
const router = require('express').Router()

// 用户注册
router.post('/', (req, res, next) => {
  res.send('用户注册')
})

module.exports = router