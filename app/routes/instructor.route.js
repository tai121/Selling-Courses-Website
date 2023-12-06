const mongoose = require('mongoose');
const User = require('../models/user.model')
const Instructor = require('../models/instructor.model')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config')

