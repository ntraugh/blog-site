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

app.get("/posts", (req, res) => {
    Post.find().then(items => res.json(items)).catch(err => console.log(err))

})

app.post("/create", (req, res) => {
    
    Post.create({
        title: req.body.title,
        description: req.body.description
    }).then(doc => console.log(doc))
    .catch(err => console.log(err))
})

app.put("/update/:id", (req, res) => {
    Post.findByIdAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        description: req.body.description
    }).then(doc => console.log(doc))
    .catch(err => console.log(err))
})

app.delete("/delete/:id", (req, res) => {
    Post.findByIdAndDelete({_id: req.params.id})
        .then(doc => console.log(doc))
        .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})