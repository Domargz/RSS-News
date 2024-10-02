const jwt = require("jsonwebtoken")
const env = process.env

function auth(req, res, next){
  try{
    const token = req.body.token;
    console.log(token)
    const validToken = jwt.verify(token, env.SECRET_KEY);
    console.log(validToken);
    res.locals.userId = validToken.userId;
    if(validToken){
      next()
    }
  }catch(err){
    return res.status(400).send({ status: false, message: "Invalid User", error: err})
  }
}


module.exports = auth
