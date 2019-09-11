/**
 * Home controller module.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

const UserData = require('../models/User')
// const userSchema = require('../models/User')
const userController = {}

/**
 * login GET
 */
userController.getLogin = (req, res, next) => {
  res.render('poaad/login')
}

/**
 * login POST
 */
userController.postLogin = async (req, res, next) => {
  try {
    var user = await UserData.findOne({ username: req.body.username })
    if (!user) {
      req.session.flash = { type: 'fail', text: 'Your password or username is wrong! Please try again!' }
      res.redirect('/login')
    }
    var result = await user.comparePassword(req.body.password)
    if (result) {
      if (req.body.username === 'admin') {
        req.session.admin = true
      }
      req.session.flash = { type: 'success', text: 'Authentication successful!' }
      req.session.authenticated = true
      req.session.username = req.body.username
      res.redirect('/')
    } else {
      req.session.flash = { type: 'fail', text: 'Username or password are wrong, try again' }
      res.redirect('/login')
    }
  } catch (err) {
    err.status(500)
    next(err)
  }
}

/**
 * register GET
 */
userController.getRegister = (req, res, next) => {
  let authenticated
  if (req.session.authenticated) {
    authenticated = { username: req.session.username }
  }
  res.render('poaad/register', { authenticated })
}

/**
 * register POST
 */
userController.postRegister = async (req, res, next) => {
  UserData.countDocuments({ username: req.body.username }, async (err, count) => {
    if (count <= 0) { // Check if username is already taken.
      try {
        // Stores new user in the database and render the loginpage.
        var credentials = new UserData({ username: req.body.username, password: req.body.password })
        await credentials.save()
        req.session.flash = { type: 'success', text: 'User successfully created. Now you can login' }
        res.redirect('/login')
      } catch (err) {
        // Handle validation error.
        if (err.errors.password.name === 'ValidatorError') {
          req.session.flash = { type: 'fail', text: err.errors.password.properties.message }
          res.redirect('/signup')
        }
        next(err)
      }
    } else {
      // Send flash if username is already taken.
      req.session.flash = { type: 'fail', text: 'Something went wrong, try again' }
      res.redirect('/signup')
    }
    if (err) {
      next(err)
    }
  })
}

module.exports = userController
