/**
 * Configugration for mongodb connection.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

/**
 * Mongodb connection.
 */
module.exports = () => {
  mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@lm-1tkxy.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true })

  var db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))
  db.on('disconnect', () => console.log('Lost connection to mongodb'))
  db.once('open', () => console.log("We're connected!"))
}
