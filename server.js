require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB_MONGO)
  .catch((error) => console.log(error));

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('server started at port = ', port);
});
