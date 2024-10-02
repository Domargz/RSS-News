const httpsMng = require('node:https');
const httpMng = require("node:http")

class HttpRequest {
  constructor(handleResponse) {
    this.https = httpsMng
    this.http = httpMng
    this.data = {
      https: "https://",
      http: "http://",
      error: {
        proto: "ERR_INVALID_PROTOCOL",
        url: "ERR_INVALID_URL"
      }
    }
    this.res = handleResponse
    this.stCode
  }

  checkUrlStructure(url) {
    const urlCompleteRegex = /^(?:https?:\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[^\s]*$/
    ///^https?:\/\/(?:www\.)?(?:[a-zA-Z0-9-]+\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[^\s]*$/

    if (urlCompleteRegex.test(url)) {
      return true
    } else {
      /**
       * Should create and send the event to broker/event mediator for user notification 
       */
      console.log("Wrong URL To Make Request")
      return false
    }
  }

  makeRequest(url) {
    const lowerUrl = url.toLowerCase();
    let request
    if (this.checkUrlStructure(url)) {
      if (lowerUrl.startsWith("https")) {
        request = this.https.get(lowerUrl, (res) => this.res(res))
        request.on("error", (error) => this.handleError(error))
      } else if (lowerUrl.startsWith("http:")) {
        request = this.http.get(lowerUrl, (res) => this.res(res))
        request.on("error", (error) => this.handleError(error))

      } else {
        request = this.https.get(`${this.data.https}${lowerUrl}`, (res) => this.res(res))
        request.on("error", (error) => this.handleError(error))
      }
    }
  }


 // handleResponse(res){
 //   const stCode = res.statusCode

 //   if(stCode >= 200 && stCode < 300){

 //     res.on("data", (chunk) => this.onData(chunk, res))
 //   }else if(stCode > 399 && stCode < 500){
 //     console.log("4xx")
 //   }else if(stCode > 400 && stCode < 600){
 //     console.log("5xx")
 //   }
 //
 // }

  handleError(e) {
    console.log(`Error: ${e}`) 
  }


  //console.log(typeof this.res)

  setStatusCode(st){
    this.stCode = st   
  }

}

module.exports =  HttpRequest
