const express= require("express")
// const dotenv= require("dotenv")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const connectDB = require("./config/db")
const { chats } = require("./data")

const app = express()
// dotenv.config()
// require('dotenv').config({ path: path.resolve('./.env') });
connectDB()

app.get("/",(req,res)=>{
    res.send("API is running")
})

app.get("/api/chat",(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req,res)=>{
    // console.log(req.params.id)
    const singleChat= chats.find(c=>c._id===req.params.id)
    res.send(singleChat)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))