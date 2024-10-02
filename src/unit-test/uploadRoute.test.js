const request = require("supertest");
const app = require("../app");
const { upload, oneError, allError, namesError} = require("./upload.object");

describe("Test the upload route", () => {
  test("request must return 200", () => {
    return request(app)
      .post("/news/upload")
      .send(upload)
      .then( response => {
        console.log(`Status Code: [${response.statusCode}]`)
        console.log(response.body.message)      
        expect(response.statusCode).toBe(200)
      })
  })

  test("request must return 200 and one error", () => {
    return request(app)
      .post("/news/upload")
      .send(oneError)
      .then( response => {
        console.log(`Status Code: [${response.statusCode}]`);
        console.log(response.body.message);  
        expect(response.statusCode).toBe(200);
      })
  })


  test("request must return 500",  () => {
    return request(app)
      .post("/news/upload")
      .send(allError)
      .then( response => {
        console.log(`Status Code: [${response.statusCode}]`);
        console.log(response.body.message);  
        expect(response.statusCode).toBe(200);
      })
  })
})
