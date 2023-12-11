require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Lesson = require("../models/lesson.model")
const Chapter = require("../models/chapter.model")

module.exports = {
    create : async (req,res,next) =>{
        try {
            const lesson = new Lesson(req.body)
            if(lesson===null)
                throw createError(400,'create fail')
            await lesson.save()
            const updatedChapter = await Chapter.findByIdAndUpdate(
                req.body.chapter_id,
                { $push: { lessons: lesson._id } },
                { new: true }
            );
            return res.status(200).json({
                'message': 'oke',
                'newToken': res.locals.newToken
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    change: async(req,res,next) => {
        try{
            const lesson = await Lesson.findById(req.body.lesson_id)
            if(!lesson)
                createError(400,'something went wrong')
            Object.assign(lesson,req.body.lesson_change)
            await lesson.save()
            return res.status(200).json({
                "message": "oke",
                "newToken": res.locals.newToken
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    delete: async(req,res,next) => {
        try{
            await Lesson.updateOne({_id:req.body.lesson_id},{isDelete: false})
            // return res.status(200).json({
            //     'message' : 'oke'
            // })
            next()
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getById: async(req, res, next) => {
        try{
            const lesson = await Lesson.find({id:req.params.lesson_id,isDelete:false})
            if(!lesson)
                createError(400,'something went wrong')
            return res.status(200).json({
                'lesson' : lesson,
                message : "oke",
                newToken: res.locals.newToken
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getByChapterId: async(req, res, next) => {
        try{
            const lesson = await Lesson.find({chapters:req.body.chapter_id,isDelete:false})
            if(!lesson)
                createError(400,'something went wrong')
                return res.status(200).json({
                    'lesson' : lesson,
                    message : "oke",
                    newToken: res.locals.newToken
                })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
}