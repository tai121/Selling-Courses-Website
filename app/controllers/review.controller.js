require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Review = require("../models/review.model")

module.exports = {
    create: async (req, res, next) => {
        try {
            const review = new Review(req.body)
            await review.save()
            return res.status(200).json({
              'message': 'oke',
                'newToken': res.locals.newToken
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    read: async (req, res, next) => {
        try {
            const reviews = await Review.find({course_id: req.body.course_id})
            return res.status(200).json({
                reviews
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    delete: async(req, res, next)=>{
        try {
            const review = await Review.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                review
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    update: async(req, res, next)=>{
        try {
            const review = await Review.findByIdAndUpdate(req.params.id, req.body)
            return res.status(200).json({
                review
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    
}