const { Schema, model } = require("mongoose");
const mongoose = require('mongoose')


const courseSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    price: {
        type : Number,
        required: true,
    },
    author_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    categories: [String],
    tags: [String],
    isDelete: {
        type: Boolean,
        require: true,
    },
    chapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    payments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
    }]

  },
  {timestamps: true}
)
const Course = model("Course", courseSchema)
module.exports = Course


