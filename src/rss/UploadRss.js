const http = require("../http/HttpRequest.js")
const NetworkEvents = require("../utils/NetworkEvents.js")

class UploadRss {
  constructor(url){
    this.url = url 
    this.http = new http((res) => this.handleResponse(res)) 
    this.networkEvent = NetworkEvents.instance()
  }


  saveRssResource(){
   this.validateRssResource()
   this.event.on("save-db", () => { 
     // Process xml and save tags on DB.
     console.log("Guardando datos en la BD.");
    })
  }


  validateRssResource(){
    this.http.makeRequest(this.url)
  }


  handleResponse(res){
    const stCode = res.statusCode

    if(stCode >= 200 && stCode < 300){
      res.on("data", (chunk) => this.onData(chunk, res))
    }else if(stCode > 399 && stCode < 500){
      console.log("4xx")
    }else if(stCode > 400 && stCode < 600){
      console.log("5xx")
    }

  }


  onData(chunk, res){
    let body
    body += chunk
    res.on("end", () => {
      this.event.emit("full-req", body) 
    })
    // Return body to be process by ProcessRss clas 
  }


  validRss(body, res){
    let bd 
    bd += body.toLowerCase()
    if (bd.includes("<?xml")){
      console.log("es un xml file")
      this.event.emit("save-db")
      res.removeListener("data", this.onData)
    }else {
      res.removeListener("data", this.onData)
      this.event.emit("no-xml")
    }
  }


}

module.exports = UploadRss
