/**
 * POAAD controller module.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

const poaadController = {}

/**
 * index GET
 */
poaadController.getIndex = (req, res, next) => {
  if (req.session.authenticated) {
    var authenticated = { username: req.session.username }
    if (req.session.admin) {
      authenticated.admin = true
    }
    res.render('poaad/index', { authenticated })
  } else res.render('poaad/index')
}

poaadController.getMap = (req, res, next) => {
  res.render('poaad/map')
}

poaadController.logout = (req, res, next) => {
  res.render('poaad/index')
}

module.exports = poaadController
