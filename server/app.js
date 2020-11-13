require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: true, origins: '*:*' });

const port = process.env.PORT || 3000;
const socketPort = process.env.SOCKET_PORT || 3838;

const sequelize = require('./models');

sequelize.sync();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(express.static('public'));

app.use('/', require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});

process.on('issue', (message) => {
  io.emit('issue', message);
});
process.on('label', (message) => {
  io.emit('label', message);
});
process.on('user', (message) => {
  io.emit('user', message);
});

io.on('connection', () => {
  console.log('socket is connected');
});

server.listen(socketPort, () => {
  console.log(`socket io server is running on port ${socketPort}...`);
});
