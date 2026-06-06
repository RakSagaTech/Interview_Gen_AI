const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model'); 



/**
 * @name registerUserController
 * @desc register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res){

  const {username, email, password} = req.body; 

  if(!username || !email || !password){
    return res.status(400).json({message: 'Please provide all required fields'});
  }

  const isUserAlreadyRegistered = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if (isUserAlreadyRegistered){
  return res.status(400).json({message: 'User with the same username or email already exists'})
}

const hashPassword = await bcrypt.hash(password, 10); 

const newUser = await userModel.create({
  username,
  email,
  password: hashPassword
})
  
const token = jwt.sign({
  id: newUser._id, 
  username: newUser.username
}, process.env.JWT_SECRET, {expiresIn: '1d'})

res.cookie('token', token)

return res.status(201).json({
  message: 'User registered successfully',
  user: {
    id: newUser._id,
    username: newUser.username, 
    email: newUser.email
  }
})  
}



module.exports = {registerUserController}