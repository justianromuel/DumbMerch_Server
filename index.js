require('dotenv').config()
//instantiate express module here
const express = require('express')

// Get routes to the variabel
const router = require('./src/routes')

//use express in app variable here
const app = express()

//define the server port here
const port = 5000

//allow this app to receive incoming json request
//Create app.use for express.json here
app.use(express.json())

// Add endpoint grouping and router
app.use('/api/v1/', router)

app.use('/uploads', express.static('uploads'))

// Create listen here
app.listen(port, () => console.log(`Listening on port: ${port}`))