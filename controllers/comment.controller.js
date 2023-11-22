const createError = require('http-errors');
const Task = require('../models/Task');
const Comment = require('../models/Comment');

module.exports.createComment = async (req, res, next) => {
  try {
    const {
      body,
      params: { idTask },
      taskInstance,
    } = req;

    const newComment = await Comment.create({ ...body, taskId: idTask });
    if (!newComment) {
      return next(createError(400, 'Bad request'));
    }
    const newComments = [...taskInstance.comments, newComment._id];
    await Task.findByIdAndUpdate(idTask, { comments: newComments });

    res.status(201).send({ data: newComment });
  } catch (error) {
    next(error);
  }
};
