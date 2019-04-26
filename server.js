
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const actionRoute = require('./route/actionRoute')
const projectRoute = require('./route/projectRoute')
require('dotenv').config()

const server =  express()

server.use(express.json())
server.use(helmet())
server.use(morgan())

server.use('/api/action', actionRoute)
server.use('/api/project', projectRoute)

server.get('/', (req, res) => {
	res.status(200).send('Weclome to project server')
})


module.exports = server
