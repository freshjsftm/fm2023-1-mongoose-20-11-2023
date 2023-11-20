const {isAfter} = require('date-fns');
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
  createdAt: { type: Date, default: Date.now },
  deadLine: {
    type:Date,  
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
      validate: { validator: (value) => value > 0 && value <= 10 },
    },
  },
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
