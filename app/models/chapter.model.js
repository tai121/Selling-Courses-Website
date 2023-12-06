const { Schema, model } = require("mongoose");
const mongoose = require('mongoose')

const chapterSchema = new Schema({
    title: {
      type:String,
      required: true,
    },
    course_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course',
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    isDelete:{
      type: Boolean,
      required: true,
      default: false,
    }
},
{timestamps: true}
)

module.exports = model("Chapter", chapterSchema)