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

router.get('/register', controller.getRegister)
router.post('/register', controller.postRegister)
router.get('/login', controller.getLogin)
router.post('/login', controller.postLogin)
router.get('/logout', controller.logout)

module.exports = router
