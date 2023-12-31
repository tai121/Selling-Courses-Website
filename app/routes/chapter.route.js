const express = require('express')
const router = express.Router()
const chapterController = require('../controllers/chapter.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const courseMiddleware = require('../middlewares/course.middleware');

router.post('/newchapter',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.instructorRole),courseMiddleware.checkUserHaveCourse,chapterController.createChapter)

router.post('/changechapter',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.instructorRole),courseMiddleware.checkUserHaveCourse,chapterController.updateChapter)

router.post('/getbycourse',chapterController.getAllChapterByCourse)

router.post('/deletebyid',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.instructorRole),courseMiddleware.checkUserHaveCourse,chapterController.deleteChapterById)



module.exports = router