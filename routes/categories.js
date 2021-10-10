/**
 * 分类
 */

const router = require('express').Router()

// 获取全部
router.get('/', (req, res, next) => {
  res.send('获取全部')
})

// 获取一个
router.get('/:cid', (req, res, next) => {
  res.send(`获取${req.params.cid}`)
})

// 添加新的
router.post('/', (req, res, next) => {
  res.send('添加')
})

// 编辑
router.put('/:cid', (req, res, next) => {
  res.send(`编辑${req.params.cid}`)
})

// 删除
router.delete('/:cid', (req, res, next) => {
  res.send(`删除${req.params.cid}`)
})

module.exports = router