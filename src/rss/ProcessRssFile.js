const HttpRequest = require("../http/HttpRequest")
const events = require("node:events")
const Parser = require("@extractus/feed-extractor")

class ProcessRssFile{
  constructor(){
    this.events = events.EventEmitter()
    this.http = new HttpRequest()
    this.parser = Parser
  }

  /*
   * Initial tags for rss version 1.0
   *  <rdf:RDF>
   *  <rss>
   *  */
  async processFile(url, nameOfSource){
    let data
      data = await this.parser.extract(url, {
        getExtraFeedFields: () => {
          return {
            sourceURL: url,
            title: nameOfSource
          }
        },
        getExtraEntryFields: (itemData) => {
          return {
            author: itemData.author || "0",
            category: itemData.category || "0"
          }
        }
      })
    return [ data ]
  }

  checkIfUpdateByDate(lastNews){
    return new Promise( async (resolve, reject) => {
      const newData = lastNews.rows.map(async element => {
        const feed = await this.processFile(element.sourceURL, element.sourceTitle);
        const ent = feed[0].entries.filter(item =>{
          const dt1 = new Date(item.published)
          const dt2 = new Date(element.latestDate)
          return dt1 > dt2
        })
        return {
          title: element.sourceTitle,
          published: element.latestDate,
          sourceURL: element.sourceURL,
          entries: ent
        };
      });
      Promise.all(newData)
        .then( dt => {
          if (dt.length > 0) {
            let data = []
            for (const index in dt){
              data.push(dt[index])
            }
            resolve(data)
          }else{
            reject(false)
          }
        })
        .catch(error => {
          console.error("Ocurrió un error:", error);
          reject(error);
        })
    })
  }


}

module.exports = ProcessRssFile
