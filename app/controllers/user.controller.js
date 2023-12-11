const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user.model')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Review = require("../models/review.model")
const Topic = require("../models/topic.model")

module.exports = {
    changeProfile : async(req, res, next) => {
        try{
            //get new profile from request
            email = req.body.email
            profile = JSON.parse(req.body.profile)

            await User.updateOne({email},{profile})
            return res.status(200).json({
                'message': 'oke',
                'newToken': res.locals.newToken
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getUserById : async(req, res, next) =>{
        try{
            const user = await User.findById(req.body.userId,{username: 1,profile: 1})
            .populate({
                path: 'payments',
                model: "Payment"
            })
            .populate({
                path: 'reviews',
                model: 'Review',
                populate:{
                    path: "topic_id",
                    model: "Topic",
                }
            })
            if (!user)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                "message": "oke",
                "user" : user,
                'newToken': res.locals.newToken
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getUserByUsername: async(req, res, next) =>{
        try{
            const user = await User.findOne({username: req.body.username},{username: 1,profile: 1})
            .populate({
                path: 'payments',
                model: "Payment"
            })
            .populate({
                path: 'reviews',
                model: 'Review',
                populate:{
                    path: "topic_id",
                    model: "Topic",
                }
            })
            if (!user)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                "message": "oke",
                "user" : user,
                'newToken': res.locals.newToken
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    disableUser: async(req, res, next)=>{
        try{
            await User.updateOne({userid:req.body._id},{isActive: false})
            return res.status(200).json({
                "message" : "oke",
                'newToken': res.locals.newToken,

            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getAllUser: async(req,res,next) =>{
        try{
            const users = await User.find()
            .populate({
                path: 'payments',
                model: "Payment"
            })
            .populate({
                path: 'reviews',
                model: 'Review',
                populate:{
                    path: "topic_id",
                    model: "Topic",
                }
            })
            if (!users)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                "message" : "oke",
                'newToken': res.locals.newToken,
                'users': users
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    }
}