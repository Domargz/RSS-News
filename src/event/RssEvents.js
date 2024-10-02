const events = require("node:events") 
const HttpRequest =  require("../http/HttpRequest")
const ProcessRssFile = require("../rss/ProcessRssFile");
const NewsRepository = require("../db/NewsRepository");

class RssEvents extends events.EventEmitter {
  constructor(){ 
    super();
    this.repository =  NewsRepository.getInstance()
    this.http = new HttpRequest((res) => this.handleResponse(res))
    this.process = new ProcessRssFile()
    this.data
    this.errors = []
  }

  static instCache

  static getInstance(url){
    if( this.instCache ===  undefined){
      this.instCache = new this(url, ev)
    }
  }


  startEvents(){
    this.startListener()
    if(this.ev.type === "upload"){
       this.uploadRss()
    }
  }


  uploadRss(url, nameOfSource, userId){
    return new Promise( async (resolve, reject) => {
      let insert
      try {
        const data = await this.process.processFile(url, nameOfSource)
        insert = await this.repository.bulkNewsByUser(data, userId);
      }catch(err){
        if(err.message){
          console.log("Primer IF")
          this.errors.push({ message: err.message });
        }else{
          this.errors.push({ url: url, message: err });
        }
      }
      resolve({ status: true, error: this.errors.length })
    })
  }


  updateRss(){
    return new Promise(async  (resolve, reject)  => {
      const lastNews = await this.repository.getLastNewsFromUser(this.user.id) 
      if(lastNews !== false){
        const updateRss  = this.process.checkIfUpdateByDate(lastNews)
        updateRss.then(data => {
          console.log("data to be inserted ", data)
          if(data !== false){
            this.repository.bulkNewsByUser(data, this.user.id).then( (res) => {
              if(res){
                resolve(true) 
              }
            }).catch( () => {
              reject(false)
            })
          }
        })
      }else{
        throw new Error("Error: getLastNewsFromUser()")  
      }
    })
  }


  checkURL(url){
    this.http.makeRequest(url)
  }


  startUploadListener(){
    this.requestListener()
  }


  requestListener(){
    this.on("rss-request", () => {
    })
  }


  processRsslistener(){
    this.on("rss-process",() =>  this.processRss())
  }


  async handleResponse(res){
    const stCode = res.statusCode
    if(stCode >= 200 && stCode < 300){
      if(res.headers["content-type"].includes("xml") ){
        this.emit("db-bulk")
        return
      }else{
        this.emit("no-xml")  
        return
      }
    }else if(stCode > 399 && stCode < 500){
      console.log("4xx")
      this.emit("net-wrong", stCode)
      return
    }else if(stCode > 400 && stCode < 600){
      this.emit("net-wrong", stCode)
      console.log("5xx")
      return
    }
  }


}

module.exports = RssEvents
