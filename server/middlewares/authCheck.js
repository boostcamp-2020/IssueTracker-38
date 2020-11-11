const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
  const token = req.headers.authorization.split('Bearer ')[1];

  jwt.verify(token, process.env.TOKEN_SECRETKEY, (err, decoded) => {
    if (err || decoded.iss !== process.env.TOKEN_ISS) {
      res.status(401).json({ error: 'Auth Error from authChecker' });
      return;
    }
    next();
  });
};

module.exports = authCheck;
