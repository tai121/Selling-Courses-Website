const express = require('express')
const router = express.Router()
const lessonController = require('../controllers/lesson.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const courseMiddleware = require('../middlewares/course.middleware')

router.post('/newlesson',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.addminRole),lessonController.create)

router.post('/changelesson',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.instructorRole),courseMiddleware.checkUserHaveCourse,lessonController.change)

router.post('/deletebyid',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.addminRole),lessonController.delete,lessonController.getByChapterId)

router.post('/getlessonbyid',authMiddleware.checkToken(constant.timeExpire),courseMiddleware.checkPayCreateAdmin,lessonController.getById)

router.post('/getlessonbychapterid',authMiddleware.checkToken(constant.timeExpire),courseMiddleware.checkPayCreateAdmin,lessonController.getByChapterId)



module.exports = router