const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect('mongodb://localhost:27017/fm_mongoose')
  .catch((error) => console.log(error));

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('server started at port = ', port);
});
