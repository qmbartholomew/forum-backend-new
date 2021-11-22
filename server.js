// ///////////////////////////
// Dependencies
// ///////////////////////////

// Getting .env variables
require('dotenv').config()
// Pulling PORT from .env, giving it a default of 3002 (object destructuring)
const { PORT = 3002, DATABASE_URL } = process.env
// Importing express
const express = require('express')
// Creating  the application object
const app = express()
// Importing mongoose
const mongoose = require('mongoose')
// Importing middleware
const cors = require('cors')
const morgan = require('morgan')

// ///////////////////////////////
// Database Connection
// //////////////////////////////
// Establishing connection
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

// Connection Events
mongoose.connection
  .on('open', () => console.log('You are connected to Mongo'))
  .on('close', () => console.log('You are disconnected from Mongo'))
  .on('error', error => console.log(error))

// ////////////////////////////
// Models
// ////////////////////////////
// The forum  schema

// // The forum  schema
// const ForumSchema = new mongoose.Schema(
//   {
//     userName: String,
//     about: String,
//     date: Date,
//     time: String,
//     message: String,
//     url: String,
//     startRating: Number


//   { timestamps: true }
// )
// Creating the forum model
// const Messages = mongoose.model('Messages', ForumSchema)
/*          MONGOOSE            */
const MessageSchema = new mongoose.Schema({
  userName: String,
  image: String,
  about: String,


//   },
//   { timestamps: true }
// )
// Creating the forum model
const Messages = mongoose.model('Messages', ForumSchema)

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


// /*          MIDDLEWARE          */
// app.use(cors())
// app.use(morgan('dev'))
// app.use(express.json())
// >>>>>>> main
=======


/*          MIDDLEWARE          */
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// // ///////////////////////////////
// // Middleware
// // ////////////////////////////////
// app.use(cors()) // Preventing cors errors, opening up access for frontend
// app.use(morgan('dev')) // Logging
// app.use(express.json()) // Parsing json bodies

// //////////////////////////////
// Routes
// //////////////////////////////
// Setting up a test route
app.get('/', (req, res) => {
  res.send('Hello World!')
})


// // Forum index route
// // Getting request to /forum messages, returning them all as json
// app.get('/messages', async (req, res) => {
//   try {
//     // Sending all forum messages
//     res.json(await Messages.find({}))
//   } catch (error) {
//     res.status(400).json({ error })
//   }
// })
// //  Forum create route
// // Posting request to /forum, using request body to make new forum messages
// app.post('/messages', async (req, res) => {
//   try {
//     // Creating a new forum message
//     res.json(await Messages.create(req.body))
//   } catch (error) {
//     res.status(400).json({ error })
//   }
// })
// // Forum update  route
// // Putting request /message/:id, updates messages based on id with request body
// app.put('/messages/:id', async (req, res) => {
//   try {
//     // Updating a message
//     res.json(
//       await Messages.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     )
//   } catch (error) {
//     res.status(400).json({ error })
//   }
// })
// // Destroy Route
// // Deleting request to /message/:id, deletes messages specified
// app.delete('/messages/:id', async (req, res) => {
//   try {
//     // Deleting a message
//     res.json(await Messages.findByIdAndRemove(req.params.id))
//   } catch (error) {
//     res.status(400).json({ error })
//   }
// })

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


// ///////////////////////////////
// Server Listener
// ///////////////////////////////
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`)
})
