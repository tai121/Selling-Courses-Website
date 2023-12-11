const mongoose = require('mongoose');
const User = require('../models/user.model')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config')

// router.post("/",authMiddleware.checkToken,authMiddleware.checkRole(constant.userRole),(req, res, next)=>{
//     res.status(200).send(res.locals.newToken)
// })

router.post('/login', authController.login)

router.post('/signup', authController.signup)

router.post('/emailchange',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.userRole),authController.changeEmail)

router.post('/passwordchange',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.userRole),authMiddleware.checkPassword,authController.changePassword)

router.post('/sendmail',authController.sendEmail)

module.exports = router