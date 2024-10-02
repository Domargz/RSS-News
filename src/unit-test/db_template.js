const RssEvent = require("../eventEmit/RssEvents")
const { returnURL, taskForDB,  delay } = require("../utils/utilsToTest")

const url = returnURL()
const dbFile = "./test-db/unitTest.db"
const user = {
  id: 1
}
const nameOfSource = "example"
const rssEvent = new RssEvent(url.second, nameOfSource, user.id)
module.exports = { rssEvent, url}
