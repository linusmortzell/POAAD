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
  res.render('poaad/index')
  /* if (req.session.authenticated) {
    let authenticated = { username: req.session.username }
    res.render('stickySnippets/index', { authenticated })
  } else res.render('stickySnippets/index') */
}

poaadController.getMap = (req, res, next) => {
  res.render('poaad/map')
}

module.exports = poaadController
