require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Chapter = require("../models/chapter.model")
const Course = require("../models/course.model")
module.exports = {
    createChapter: async(req,res,next) => {
        try{
            const chapter = new Chapter(req.body)
            await chapter.save()
            await Course.findByIdAndUpdate(
                req.body.course_id,
                { $push: { chapters: chapter._id } },
                { new: true }
            );
            return res.status(200).json({
                'message': 'oke',
                'newToken': res.locals.newToken
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    updateChapter: async(req, res,next) => {
        try{
            console.log(req.body.change)
            const chapter = await Chapter.findById(req.body.chapter_id)
            if(!chapter)
                throw createError(400,'Chapter is not found')
            change = req.body.change
            for (const key in change) {
                if (change.hasOwnProperty(key)) {
                    chapter[key] = change[key];
                }
            }
            await chapter.save()
            return res.status(200).json({
                'message': 'oke',
                'newToken': res.locals.newToken
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getAllChapterByCourse : async(req,res, next)=>{
        try{
            const chapters = await Chapter.find({course_id: req.body.course_id,isDelete:false})
            return res.status(200).json({
                'message': 'oke',
                chapters,
                'newToken': res.locals.newToken
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    deleteChapterById : async(req,res, next)=>{
        try{
            await Chapter.updateOne({_id:req.body.chapter_id},{isDelete:true})
            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getChapterWithLesson : async(req,res,next)=>{
        try{
            const chapters = await Chapter.find({course_id: req.body.course_id,isDelete:false})
            .populate({
                match: { isDelete: false },
                path: 'lessons',
                model: 'Lesson',
            })
            return res.status(200).json({
                'message': 'oke',
                chapters,
                'newToken': res.locals.newToken
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    }
}