const config = require('./config')

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.end('1234')
})

app.listen(config.app.port, () => {
  console.log(`Running at http://localhost:${config.app.port}`);
})