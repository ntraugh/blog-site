const express = require('express')
const app = express()
const PORT = 3001
const mongoose = require("mongoose")



app.use(express.json())

mongoose.connect("mongodb://localhost:27017/nateblogdb")
    .catch(err => console.log(err))

const postSchema = mongoose.Schema({
    title: String,
    description: String
})

const Post = mongoose.model("Post", postSchema)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/create", (req, res) => {
    console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})