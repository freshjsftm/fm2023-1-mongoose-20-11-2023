const express = require('express');
const TaskController = require('./controllers/task.controller');

const app = express();
app.use(express.json());

app
  .route('/tasks')
  .post(TaskController.createTask)
  .get(TaskController.getAllTasks);

app
  .route('/tasks/:idTask') 
  .get(TaskController.getTask) 
  .patch(TaskController.updateTask)
  .delete(TaskController.deleteTask)

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

module.exports = app;
