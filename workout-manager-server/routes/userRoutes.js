const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const express = require('express')

const router = express.Router(); 

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
module.exports = router; 



//Create a new user with workouts 

