const { signin, login } = require("./server/controller/user.controller")
require("dotenv").config({path: "./.env"});
const Repository = require("./db/NewsRepository")
const express = require('express')
const app = express()
const port = 3000
const news = require("./server/routes/news")
const repo = Repository.getInstance();
repo.init(process.env.DB_NAME)

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Musica")
})

app.post("/signup", (req, res) => signin(req, res))
app.post("/login", login)

app.use("/news", news);


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app
