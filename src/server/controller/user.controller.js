const bcryptjs = require("bcryptjs")
const Repository = require("../../db/NewsRepository")
const repository = Repository.getInstance()
const jwt = require("jsonwebtoken")
const env = process.env

async function login(req, res){
  const email = req.body.email;
  //const userName = req.body.user; 
  const password = req.body.password;
  if(email && password){
    const userData = await repository.getPasswordByEmail(email) 
    const checkPassword = await bcryptjs.compare(password, userData.rows.password)
    if(checkPassword){
      const token = jwt.sign({ email, userId: userData.rows.id }, env.SECRET_KEY,
        {
          expiresIn: "1y"
        }
      ) 
      res.status(200).send({ status:true, message: "Successfuly Login", token})
    }else{
      res.status(400).send
      ({
        status: false,
        message: "There are an incorrect field."
      })
    }
  }else{

  }
}


async function signin(req, res)  {
  const email = req.body.email;
  const userName = req.body.user; 
  const password = req.body.password;
  let newUser

  if(email && userName && password){
    const salt = await bcryptjs.genSalt(1);
    const hashPassword = await bcryptjs.hash(password, salt);
    newUser = await repository.insertUser(userName, email, hashPassword); 
    if(newUser){
      res.status(201).send(true)
    }else{
      res.status(500).send
      ({
        status:"error",
        message:"there is an error on create user"
      })
    }
  }else{
    res.status(500).send
    ({ 
      status: "Error", 
      message: "Hace falta(n) campo(s)" 
    })
  }
  
}

module.exports = { signin, login }
