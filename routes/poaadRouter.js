/**
 * POAAD router module.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/poaadController')

router.get('/', controller.getIndex)
router.get('/map', controller.getMap)
router.get('/logout', controller.logout)

module.exports = router
