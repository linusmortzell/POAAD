/**
 * User module.
 *
 * @author Linus Mörtzell
 * @version 1.0.1
 */

'use strict'

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userDataSchema = new Schema({
  username: {
    type: String,
    required: true,
    createIndexes: true
  },
  password: {
    type: String,
    required: true,
    createIndexes: true,
    minlength: [8, 'Password must contain at least 8 characters']
  }
})

/**
 * Salting and hashing the password before storing in the database.
 */
userDataSchema.pre('save', async function (next) {
  var user = this
  if (user.isModified('password') || user.isNew) {
    var hashPwd = await bcrypt.hash(this.password, 15) // Second param = Salt rounds
    user.password = hashPwd
  }
  next()
})

/**
 * Comparing input password (hashed) with password stored in the database (hashed).
 */
userDataSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

var UserData = mongoose.model('userdata', userDataSchema)

module.exports = UserData
