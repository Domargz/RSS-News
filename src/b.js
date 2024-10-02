const Repository = require("../db/NewsRepository")
const { delay } = require("../utils/utilsToTest")
const RssEvent = require("../eventEmit/RssEvents")
const getURL = require("../utils/utilsToTest")
const ProcessrssEvent = require("../rss/ProcessRssFile")
const user = {
  id: 1
}

const dbFile = "./test-db/updateEvent.db"
const nameOfSource = "example"
const url = getURL() 
const processrssEvent = new ProcessrssEvent()
const rssEvent = new rssEventEvents(url.second,nameOfSource, user.id)

const data = processrssEvent.processFile(url.second, nameOfSource)  
let lastNews 


