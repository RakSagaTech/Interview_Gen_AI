const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model'); 
const tokenBlacklistModel = require('../models/blacklist.model');



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


/**
 * @name loginUserController
 * @desc login an existing user, expects username and password in the request body
 * @access Public
 */

async function loginUserController(req, res){

  const {username, password} = req.body; 

  const user = await userModel.findOne({username}) 

  if(!user){
    return res.status(400).json({message: 'Invalid username or password'})
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(400).json({message: 'Invalid username or password'})
  }

  const token = jwt.sign({
    id: user._id,
    username: user.username
  }, process.env.JWT_SECRET, {expiresIn: '1d'})

  res.cookie('token', token) 
  
  return res.status(200).json({
    message: 'User logged in successfully',
    user: {  
      id: user._id, 
      username: user.username,
      email: user.email
    }
  })
}


/**
 * @name logoutUserController
 * @desc logout an existing user, clears the token from the cookie and adds the token to the blacklist
 * @access Public
 */

async function logoutUserController(req, res){

  const token = req.cookies.token; 

  if(token){
    await tokenBlacklistModel.create({token})
  }

  res.clearCookie('token');
  return res.status(200).json({message: 'User logged out successfully'})
}


/**
 * @name getMeController
 * @desc get the details of the logged in user
 * @access Private
 */
async function getMeController(req, res){
  const user = await userModel.findById(req.user.id); 

  if(!user){
    return res.status(404).json({message: 'User not found'})
  }

  res.status(200).json({ 
    message: 'User details fetched successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

module.exports = {registerUserController, loginUserController, logoutUserController, getMeController}