const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const paymentMiddleware = require('../middlewares/payment.middleware')

router.post('/create',authMiddleware.checkToken(constant.timeExpire),paymentController.create)

module.exports = router