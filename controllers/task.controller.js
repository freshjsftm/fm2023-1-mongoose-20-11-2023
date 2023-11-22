const createError = require('http-errors');
const Task = require('../models/Task');
const Comment = require('../models/Comment');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await Task.create(body);
    if (!newTask) {
      return next(createError(400, 'Bad request!'));
    }
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('comments').exec();
    if (tasks.length === 0) {
      return res.status(200).send({ data: 'tasks are empty' });
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;

    //const task = await Task.findById(idTask);
    //const task = await Task.findById(idTask).populate('comments').exec();
    const task = await Task.findById(idTask)
      .populate({ path: 'comments', select: ['description', 'like'] })
      .exec();

    if (!task) {
      return next(createError(404, 'Task not found!'));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
      body,
    } = req;
    const task = await Task.findByIdAndUpdate(idTask, body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(createError(404, 'Task not found!'));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const task = await Task.findByIdAndDelete(idTask);
    if (!task) {
      return next(createError(404, 'Task not found!'));
    }
    //delete all commets this task!!!!
    await Comment.deleteMany({ taskId: task._id });
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
