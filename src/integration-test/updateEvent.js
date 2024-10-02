const RssEvent = require("../eventEmit/RssEvents")
const { returnURL,taskForDB,  delay } = require("../utils/utilsToTest")

const url = returnURL()
const dbFile = "./test-db/integTest.db"
const user = {
  id: 1
}
const nameOfSource = "example"
const rssEvent = new RssEvent(url.second, nameOfSource, user.id)
let lastNews

beforeAll( async () =>{
  await rssEvent.repository.init(dbFile)
 // await taskForDB(rssEvent, url, nameOfSource, user, 1)
  lastNews = await rssEvent.repository.getAllNewsByUser(user.id) 
})

afterAll( async () =>{
  rssEvent.repository.closeDB()
})

describe("RssEvent Class Events", () => {
  describe("Update event", () => {
    test("execute update methos", async () => {
      console.log(`Data in News table: ${JSON.stringify(lastNews.rows)}`)
      await delay(1000)
      const isUpdate = await rssEvent.updateRss()  
      expect(isUpdate).toBe(true)
    })

    test("check if data is inserted", async () => {
      const result = await rssEvent.repository.getAllNewsByUser(user.id)
      console.log(result)
      const isInserted = result.length > 2 ? true : false
      expect(isInserted).toBe(true)
    })
  })
})
