const RssEvents = require("../eventEmit/RssEvents");
const { rssEvent, url } = require("./db_template");

const file = "./test-db/unit.db"



const user = {
  name: "David",
  email: "a@mail.coom",
  password: "1234"
}

beforeAll( async () => {
  await rssEvent.repository.init(file)
  await rssEvent.repository.createTables()
})


afterAll( () => {
  rssEvent.repository.closeDB()
})


test("Insert User", async  () => {
  
  const insertUser = await rssEvent.repository.insertUser(user.name, user.email, user.password)

  expect(insertUser.status).toBe(true)
})
