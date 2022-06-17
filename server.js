/*          DEPENDENCIES            */
require('dotenv').config()
const {PORT = 3002, DATABASE_URL} = process.env
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

/*          DATABASE CONNECTION         */
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
.on('open', () => {console.log('Connected to Mongo')})
.on('close', () => {console.log('Disconnected from Mongo')})
.on('error', (error) => {console.log(error)})

/*          MONGOOSE            */
const MessageSchema = new mongoose.Schema({
    userName: String,
    image: String,
    about: String,
    date: String,
    time: String,
    message: String,
    url: String,
    startRating: Number
}, {timestamps: true})

const Message = mongoose.model('Message', MessageSchema)

/*          MIDDLEWARE          */
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

/*          ROUTES          */
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Index route
app.get('/forum', async (req, res) => {
    try {
        res.json(await Message.find({}))
    } catch(error) {
        res.status(400).json(error)
    }
})

// Create route
app.post('/forum', async (req, res) => {
    try {
        res.json(await Message.create(req.body))
    } catch(error) {
        res.status(400).json(error)
    }
})

// Update route
app.put('/forum/:id', async (req, res) => {
    const id = req.params.id
    try {
        res.json(await Message.findByIdAndUpdate(id, req.body, {new: true}))
    } catch(error) {
        res.status(400).json(error)
    }
})

// Destroy route
app.delete('/forum/:id', async (req, res) => {
    const id = req.params.id
    try {
        res.json(await Message.findByIdAndRemove(id))
    } catch(error) {
        res.status(400).json(error)
    }
})


/*          SERVER LISTENER         */
app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)})