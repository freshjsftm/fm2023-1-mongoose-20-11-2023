const { isAfter } = require('date-fns');
const mongoose = require('mongoose');
const { contentSchema, emailSchema } = require('../utils/validationSchemas');
const { Schema } = mongoose;

const taskSchema = new Schema({
  content: {
    type: String,
    required: true,
    validate: {
      validator: (value) => contentSchema.isValid(value),
      message: (props) => `${props.value} is bad content!`,
    },
  },
  isDone: { type: Boolean, default: false },
  deadLine: {
    type: Date,
    validate: { validator: (value) => isAfter(value, Date.now()) },
  },
  owner: {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: { validator: (value) => emailSchema.isValid(value) },
    },
    raiting: {
      type: Number,
      min: 1,
      max: 5,
      default: 1
    },
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
},{
  versionKey: false,
  timestamps: true
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
