const express= require("express")
// const dotenv= require("dotenv")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const connectDB = require("./config/db")
const { chats } = require("./data")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())
// dotenv.config()
// require('dotenv').config({ path: path.resolve('./.env') });
connectDB()

app.get("/",(req,res)=>{
    res.send("API is running")
})

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))