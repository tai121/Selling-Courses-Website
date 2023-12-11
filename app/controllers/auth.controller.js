const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user.model')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const userMiddleware = require('../middlewares/user.middleware')
const sendMail = require('../service/mail.service')
module.exports = {
    login : async(req, res, next) => {
        try {
            //get email, password
            let {email, password} = req.body

            //check email exist
            const user = await User.findOne({email})
            if(!user)
                throw createError(403, 'email or password was wrong')

            //compair with db
            let isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch)
                throw createError(403, 'email or password was wrong')

            //Check enabled account
            if(!user.isEnable)
                throw createError(403, 'your account is locked by us')

            //Check active account
            if(!user.isActive)
                throw createError(403, 'your account is not active')

            // create jwt
            let roleString = user.roles.toString()
            let profile = user.profile.toString()
            let token = jwt.sign({
                _id: user._id,
                roles: roleString,
                username: user.username,
                profile: profile,
                name: user.name,
                email: user.email
            },
            process.env.APP_SECRET,{
                expiresIn: timeExpire
            })
            //send responce

            let result = {
                username: user.username,
                role: user.roles,
                email: user.email,
                profile: profile,
                token: `Bearer ${token}`
              };
            return res.status(200).json({
                ...result,
                message: "You are now logged in.",
              })

            } catch (error) {
                console.log(error.message)
                next(error)
            }
        
    },


    signup : async(req, res, next) => {
        try {
            //validate email password
            // console.log(req.body.email)

            //check valid email
            const existEmail = async(email) => {
                let user = await User.findOne({ email: email });
                // console.log(user)
                if(user == null) return false
                return true
            }
            // console.log(await existEmail(req.body.email))
            if(await existEmail(req.body.email))
                throw createError(400,'this email is alreadly taken')

            //Add user to db
            let password = await bcrypt.hash(req.body.password,10)
            const user = new User({
                ...req.body,
                password,
                roles: ['USER'],
                isActive: false,
                isEnable: true,
            })

            await user.save()

            //TODO send email to active account

            //send OK 
            return res.status(200).json({
                'message': 'oke'
            })
            
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    changeEmail : async(req, res, next) => {
        try{
            //get new email from req
            oldEmail = req.body.email
            newEmail = req.body.new_email
            
            //find user, change email and save to 
            // userMiddleware.changeUser({email: oldEmail},{email: newEmail})
            await User.updateOne({'email': oldEmail},{'email':newEmail})
            return res.status(200).json({
                'message': 'oke',
                'newToken': res.locals.newToken
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    changePassword : async(req, res, next) => {
        try{
            //get new pass from request
            oldEmail = req.body.email
            newPassword = await bcrypt.hash(req.body.new_password, 10)
            
            //find user, change password and save to 
            // userMiddleware.changeUser({email: oldEmail},{email: newEmail})
            await User.updateOne({'email': oldEmail},{'password':newPassword})
            return res.status(200).json({
                'message': 'oke',
                'newToken': res.locals.newToken
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    sendEmail: async (req, res, next) =>{
        try{
            // let roleString = user.roles.toString()
            // let profile = user.profile.toString()
            // let token = jwt.sign({
            //     _id: user._id,
            //     roles: roleString,
            //     username: user.username,
            //     profile: profile,
            //     name: user.name,
            //     email: user.email
            // },
            // process.env.APP_SECRET,{
            //     expiresIn: timeExpire
            // })
            const t = sendMail("phamductaidtsomuch@gmail.com","test","#")
            console.log(t)
            return res.status(200).json({
                'message': 'oke',
                'newToken': res.locals.newToken
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    }
    
}