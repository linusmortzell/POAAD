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
poaadController.getLogin = (req, res, next) => {
  res.render('pooad/login')
  /* if (req.session.authenticated) {
    let authenticated = { username: req.session.username }
    res.render('stickySnippets/index', { authenticated })
  } else res.render('stickySnippets/index') */
}

module.exports = poaadController
