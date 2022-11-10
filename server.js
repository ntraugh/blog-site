const express = require('express')
const app = express()
const PORT = 3001
const mongoose = require("mongoose")
// small change to see node modules


app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/create", (req, res) => {
    console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})