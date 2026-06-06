const express = require('express'); 
const authController = require('../controllers/auth.controller');

const authRouter = express.Router();


/**
 * @route POST /api/auth/register 
 * @desc Register a new user 
 * @access Public 
 */

authRouter.post('/register', authController.registerUserController);


/**
 * @route POST /api/auth/login 
 * @desc Login an existing user 
 * @access Public 
 */
authRouter.post('/login', authController.loginUserController);



/**
 * @route POST /api/auth/logout 
 * @desc clear the token from the cookie and add the token to blacklist
 * @access Public 
 */
authRouter.post('/logout', authController.logoutUserController);

module.exports = authRouter;