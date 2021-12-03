const Router = require('express').Router()

// 引入 Model
const { Category} = require('../../model/categories')
const { Article} = require('../../model/articles')

// 首页路由与分类路由
Router.get(['/','/:cid'], async (req, res) =>{
    
    res.render('index.html')
})

Router.get('/articles/:articleId', async (req, res) => {
    res.render('article.html')
})

module.exports = Router