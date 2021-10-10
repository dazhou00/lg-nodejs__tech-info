const config = require('./config')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// 引入中间件
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.post('/', (req, res) => {
  console.log(req.body);
  res.end('1234')
})

app.listen(config.app.port, () => {
  console.log(`Running at http://localhost:${config.app.port}`);
})