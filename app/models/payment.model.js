const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");
const paymentSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    total: {
        type: Number,
        required: true,
    },
  },
  {timestamps:true}
  
)


const Payment = model("Payment", paymentSchema)
module.exports = Payment
