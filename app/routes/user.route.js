const mongoose = require('mongoose');
const User = require('../models/user.model')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const { route } = require('./course.route');


router.post('/profilechange',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.userRole), userController.changeProfile)

router.post('/getuserbyid',userController.getUserById)

router.post('/getuserbyusername',userController.getUserByUsername)

router.post('/disableuser',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.addminRole),userController.disableUser)

router.post('/getalluser',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.addminRole), userController.getAllUser)

module.exports = router