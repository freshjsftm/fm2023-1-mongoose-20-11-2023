const createError = require('http-errors');
const Task = require('../models/Task');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await Task.create(body);
    if (!newTask) {
      next(createError(400, 'Bad request!'));
    }
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      res.status(200).send({ data: 'tasks are empty' });
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
    const task = await Task.findById(idTask);
    if (!task) {
      next(createError(404, 'Task not found!'));
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
      next(createError(404, 'Task not found!'));
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
      next(createError(404, 'Task not found!'));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
