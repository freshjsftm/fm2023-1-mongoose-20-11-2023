const mongoose = require('mongoose');
const { Schema } = mongoose;
const { contentSchema } = require('../utils/validationSchemas');

const commentSchema = new Schema({
  description: {
    type: String,
    required: true,
    validate: {
      validator: (value) => contentSchema.isValid(value),
      message: (props) => `${props.value} is bad content!`,
    },
  },
  like: {
    type: Number,
    default: 0 //1 like  -1 dislike
  },
  taskId:{
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }
},{
  versionKey: false,
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
