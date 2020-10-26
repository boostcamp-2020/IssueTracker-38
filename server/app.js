const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// TODO: 제거
app.get('/', (req, res) => {
  res.status(200).send('hello');
});

/**
 * 디렉토리 구조
 * routes - services - models - (DB)
 * middlewares
 */

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Error handler catches server error');
});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
