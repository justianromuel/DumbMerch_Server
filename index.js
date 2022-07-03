require('dotenv').config()
//instantiate express module here
const express = require('express')

const cors = require('cors')

const http = require('http')
const { Server } = require('socket.io')

// Get routes to the variabel
const router = require('./src/routes')

//use express in app variable here
const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000' // define client origin if both client and server have different origin
    }
})

require('./src/socket')(io)

//define the server port here
const port = 5000

//allow this app to receive incoming json request
//Create app.use for express.json here
app.use(express.json())
app.use(cors())

// Add endpoint grouping and router
app.use('/api/v1/', router)

app.use('/uploads', express.static('uploads'))

// Create listen here
server.listen(port, () => console.log(`Listening on port: ${port}`))