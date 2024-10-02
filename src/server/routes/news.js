const auth = require("../middleware/auth")
const RssEvent = require("../../event/RssEvents")
const express = require("express")
const router = express.Router()
const Repository = require("../../db/NewsRepository")
const repository = Repository.getInstance()

router.use(auth)

router.get("/getNews", async(req, res) => {
  try{
    const userId = res.locals.userId;
    const news = await repository.getAllNewsByUser(userId)
    if(news.status){
      res.send({ status: true, message: "All News of user send", news: news.rows })
    }
  }catch(err){
    res.status(400).send({ status: false, message: "No se pudo obtener las noticias" })
  }
})


router.get("/getReadLater", async(req, res) => {
  try{
    const userId = res.locals.userId;
    const savedNews = await repository.getAllReadLaterNews(userId)
    
    if(savedNews.status){
      res.send({ status: true, message: "Successfully request", news: savedNews.rows })
    }
  }catch(err){

  }
})


router.get("/getReaded", async(req, res) => {
  try {
    const userId = res.locals.userId;
    const readed = await repository.getReadedByUser(userId);

    if(readed.status){
      res.send({ status: true, message: `Successfully request`, account: readed.rows.length, news: readed.rows });
    }
  }catch(err){
    res.status(500).send({ status:false, error: err.message, message: "error en /getReaded" })
  }
})


router.post("/upload",async (req, res) => {
  try{
    const items = req.body.items
    const userId =  res.locals.userId;
    const rssEvent = new RssEvent();
    for(let i=0; i < items.length; i++){
      await rssEvent.uploadRss(items[i].url, items[i].nameOfSource, userId)
    }
    if(rssEvent.errors){
      console.log(rssEvent.errors)
      res.send({ status: false, message: "Erros with some URL's", error: rssEvent.errors })
    }else{
      res.send({ status: true, message: "News added successfuly" });
    }
  }catch(err){
    console.log(err.stack)
    res.status(500).send({ status:false, error: err.message, message: "error en /upload" })
  }
})


router.post("/saveNews", async(req, res) =>{
  try{
    const readLater = req.body.readLater
    const userId = res.locals.userId;
    const insert = await repository.insertReadLaterNews(userId, readLater)

    if(insert.status){
      res.send({ status: true, message: "News Later added successfuly" })
    }
  }catch(err){
    res.status(500).send({ status: false, message: `Error: [${err}]` })  
  }
})


router.post("/readed", async(req, res) =>{
  try{
    const newsId = req.body.readed;
    const userId = res.locals.userId;
    const readedNews = await repository.insertReaded(userId, newsId)
    
    if(readedNews.status){
      res.send({ status: true, message:`News inserted [${readedNews.readed}]` }) 
    }
  }catch(err){
    console.log(err.stack)
    res.status(500).send({ status:false, error: err.message });
  }
})

module.exports = router
