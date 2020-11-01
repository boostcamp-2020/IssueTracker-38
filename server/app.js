require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const sequelize = require('./models');

sequelize.sync();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(logger('dev'));

app.use('/', require('./routes'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Error handler catches server error');
});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
