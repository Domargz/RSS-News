function returnURL(){
  return {
    second: "https://lorem-rss.herokuapp.com/feed?unit=second&length=2",
    second30: "https://lorem-rss.herokuapp.com/feed?unit=second&interval=30&length=2"
  }
}
taskForDB = async (rssEvent, url, nameOfSource, user, active) => {
  if(active){
    await rssEvent.repository.createTables()
    await rssEvent.repository.insertUser("David", "rg@mail.com")
    const data = await rssEvent.process.processFile(url.second, nameOfSource)
    await rssEvent.repository.bulkNewsByUser(data, user.id)
    console.log(`data: \n\t${JSON.stringify(data)}`)
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = { returnURL, taskForDB, delay }
