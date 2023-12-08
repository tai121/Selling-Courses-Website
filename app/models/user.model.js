const { Schema, model } = require("mongoose");
const mongoose = require('mongoose')
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) =>{
                return /^[a-zA-Z0-9_-]{3,20}$/.test(value)
            },
            message: 'Invalid username format. Username must containInvalid username format. Usernames must contain only letters, numbers, underscores, and hyphens, and be between 3 and 20 characters long.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) =>{
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
            },
            message: 'Invalid email address',
        }
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
  },
  roles: {
    type: [String],
    required : true
  },
  isEnable: {
    type: Boolean,
    require: true
  },
  isActive: {
    type: Boolean,
    require: true
  },
  payments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
}],
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }]
  
},
{timestamps: true}
)

const User = model("User", userSchema)
module.exports = User
