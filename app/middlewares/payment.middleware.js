const jwt = require('jsonwebtoken')
require('dotenv').config()
const createError = require('http-errors')
const User = require('../models/user.model')
const Payment = require('../models/payment.model')
const constant = require('../config/constant.config')
const Lesson = require('../models/lesson.model')
const Chapter = require('../models/chapter.model')
module.exports = {
    checkIsPaid: async (req, res, next) => {
        try{
            const lesson = await Lesson.findById(req.params.lessonId)
            if(!lesson)
                throw createError(404,'lesson not found!')
            const chapter = await Chapter.findById(lesson.chapter_id)
            if(!chapter)
                throw createError(404,'lesson not found!')
            const payment = await Payment.find({courseId: chapter.course_id,userId: res.locals.userInfo._id})
            if(payment!==null)
                next()
            else
                throw createError(400,'you don\'t have role to do this!')
        }catch (error) {
            console.log(error.message)
            next(error)
        }
        
    },
}