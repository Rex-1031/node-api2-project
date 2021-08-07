// implement your server here
const express = require('express')
const postsRouter = require('./posts/posts-router')

const server = express()
// require your posts router and connect it here
server.use('/api/posts', postsRouter)
server.use(express.json())


module.exports =server