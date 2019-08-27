/**
 * Home router module.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/userController')

router.get('/signup', controller.getSignup)
router.get('/login', controller.getLogin)
router.post('/login', controller.postLogin)

module.exports = router
