const axios = require('axios');
const jwt = require('jsonwebtoken');

const { User } = require('../models').models;
const { update: updateUser } = require('./user.service');

const getUserAccessToken = (user) => {
  const data = {
    iss: process.env.TOKEN_ISS,
    id: user.id,
    nickname: user.nickname,
  };
  const secretKey = process.env.TOKEN_SECRETKEY;
  const expire = { expiresIn: '30m' };

  const token = jwt.sign(data, secretKey, expire);

  return token;
};

const getRefreshToken = () => {
  const data = { iss: process.env.TOKEN_ISS };
  const secretKey = process.env.TOKEN_SECRETKEY;
  const expire = { expiresIn: '30h' };

  const token = jwt.sign(data, secretKey, expire);

  return token;
};

module.exports = {
  async getAcessToken(req, res) {
    const { code } = req.body;

    const clientId = process.env.GITHUB_CLIENT_ID;
    const secret = process.env.GITHUB_SECRET;

    const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}&code=${code}`;
    const USER_PROFILE_URL = 'https://api.github.com/user';

    const { data } = await axios.post(TOKEN_URL);
    const queryString = new URLSearchParams(data);
    const githubToken = queryString.get('access_token');
    const { data: userData } = await axios.get(USER_PROFILE_URL, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    });

    const { login: nickname } = userData;
    const [result, isCreated] = await User.findOrCreate({ where: { nickname }, defaults: {} });
    const { dataValues: user } = result;

    const accessToken = getUserAccessToken(user);
    const refreshToken = getRefreshToken();
    await updateUser(user.id, refreshToken);

    res.status(200).send({
      accessToken,
      refreshToken,
      userInfo: { id: user.id, nickname: user.nickname },
    });

    if (isCreated) process.emit('user', { type: 'ADD', payload: user });
  },
  async getFreshAcessToken(req, res) {
    const refreshToken = req.headers.authorization.split('Bearer ')[1];
    const result = await User.findOne({ where: { refreshToken } });

    if (!result) {
      res.status(401).send({ message: 'Invalid refresh token' });
      return;
    }

    const accessToken = getUserAccessToken(result.dataValues);
    res.status(200).send({ accessToken });
  },
};
