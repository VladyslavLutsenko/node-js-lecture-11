const { Schema, model } = require('mongoose');
const { emailPattern } = require('../constants/patterns');

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, match: emailPattern },
    password: { type: String, required: true, minLength: 4 },
    token: { type: String },
    verificationToken: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

module.exports = User;
