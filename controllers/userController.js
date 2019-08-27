/**
 * Home controller module.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

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
userController.postLogin = (req, res, next) => {
  console.log(req.body.username)
  console.log(req.body.password)
  res.render('/')
}

/**
 * signup GET
 */
userController.getSignup = (req, res, next) => {
  res.render('poaad/signup')
}

module.exports = userController
