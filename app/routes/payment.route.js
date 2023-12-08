const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const paymentMiddleware = require('../middlewares/payment.middleware')

router.post('/create',authMiddleware.checkToken(constant.timeExpire),paymentController.create)

router.post('/read',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.addminRole),paymentController.read)


router.post('/delete',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.addminRole),paymentController.delete)



module.exports = router