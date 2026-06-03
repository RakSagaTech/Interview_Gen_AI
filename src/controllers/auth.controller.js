const userModel = require('../models/user.model'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @name registerUserController
 * @desc register a new user, expects username, email and password in the request body
 * @access Public
 */

async function registerUserController(req, res){
  try{
    const {username, email, password} = req.body; 

    if (!username || !email || !password){
      return res.status(400).json({message: 'All fields are required'});
    }

    const isUserAlreadyExists = await userModel.findOne({$or: [{username}, {email}]}); 

    if (isUserAlreadyExists){
      return res.status(400).json({message: 'Username or email already exists'});
    } 

    const hashedPassword = await bcrypt.hash(password, 10);  

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({
      id: newUser._id,
      username: newUser.username, 
    }, process.env.JWT_SECRET, {expiresIn: '1h'})
    
    res.cookie('token', token)
    return res.status(201).json({message: 'User registered successfully', 
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  }catch(err){
    console.error('Error registering user:', err);
    return res.status(500).json({message: 'Server error'});
  }
}

module.exports = {registerUserController};