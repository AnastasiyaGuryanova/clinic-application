const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.redirect('/login');
  }
};
