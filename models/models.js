const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const RequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/.test(v);
      },
      message: props => `${props.value} не является допустимым номером телефона!`
    }
  },
  problemDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);
const Request = mongoose.model('Request', RequestSchema);

module.exports = { User, Request };
