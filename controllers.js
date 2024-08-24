const { Request, User } = require('./models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./constants/constants');

async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log('Результат сравнения паролей:', isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new Error('Неправильный пароль');
  }
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' });
}

async function addRequest(data) {
  return await Request.create(data);
}

async function getRequests() {
  return await Request.find().sort({ createdAt: -1 });
}

module.exports = { loginUser, addRequest, getRequests };
