const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePasswords = async function (Password) {
  return await bcrypt.compare(Password, this.password)
}

module.exports = mongoose.model('User', UserSchema) 
