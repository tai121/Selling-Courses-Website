const mongoose = require('mongoose')
const topicSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    topic: String
    
  })

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic

