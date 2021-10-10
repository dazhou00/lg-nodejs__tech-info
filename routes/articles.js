/**
 * 文章
 */
const router = require('express').Router()

// 获取全部
router.get('/', (req, res, next) => {
  res.send('获取全部文章')
})

// 获取单个文章
router.get('/:articleId', (req, res, next) => {
  res.send(`获取文章${req.params.articleId}`)
})

// 添加文章
router.post('/', (req, res, next) => {
  res.send('添加文章')
})

// 编辑文章
router.put('/:articleId', (req, res, next) => {
  res.send(`编辑文章${req.params.articleId}`)
})

// 删除文章
router.delete('/:articleId', (req, res, next) => {
  res.send(`删除文章${req.params.articleId}`)
})

module.exports = router