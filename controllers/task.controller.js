const Task = require('../models/Task');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await Task.create(body);
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
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
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
      body
    } = req;
    const task = await Task.findByIdAndUpdate(idTask, body, {
      new: true,
      runValidators: true
    });
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
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};