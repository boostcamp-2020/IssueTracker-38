require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

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

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
