const RssEvent = require("../src/eventEmit/RssEvents")
const { returnURL } = require("../src/utils/utilsToTest")

const url = returnURL()
const dbFile = "./test-db/integTest.db"
const user = {
  id: 1
}
const nameOfSource = "example"
const rssEvent = new RssEvent(url.second, nameOfSource, user)
let lastNews
let ln
let ndata

(async () => {
  await rssEvent.repository.init(dbFile)
  lastNews = await rssEvent.repository.getAllNewsByUser(user.id) 

  ln = await rssEvent.repository.getLastNewsFromUser(user.id)
  console.log(JSON.stringify(ln.rows))

  ndata = await rssEvent.process.checkIfUpdateByDate(ln)
  console.log(`Data: \n\t${JSON.stringify(ndata)}`)

  //await rssEvent.updateRss();
  await rssEvent.uploadRss()



})()
