/**
 * The starting point of the application.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

require('dotenv').config()
// const mongoose = require('./config/mongoose')
const express = require('express')
const hbs = require('express-hbs')
// const logger = require('morgan')
const path = require('path')
const app = express()
// const session = require('express-session')
// const helmet = require('helmet')
const port = process.env.PORT || 8000

/* // Setup helmet
app.use(helmet())
app.use(helmet.contentSecurityPolicy({
  directives: {
    scriptSrc: ["'self'"]
  }
})) 

// Connect to database
mongoose() */

// View engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

app.set('view engine', 'hbs') // Declare view engine
app.set('views', path.join(__dirname, 'views')) // Path to view caltalogue

/* // Setup session
const sessionOptions = {
  name: 'stksnpseso',
  secret: 'a2b4c6d8e10f12',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Dont allow client script messing with the cookie
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    sameSite: 'lax' // POST csrf-attack protection
  }
}

app.use(session(sessionOptions))

app.use((req, res, next) => {
  // Flash message only survives one round trip.
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
}) */

// Additional middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, 'public')))

// Setup csurf token
app.use(require('csurf')())

/* app.use((req, res, next) => {
  res.locals._csrfToken = req.csrfToken()
  next()
}) */

// Routes
app.use('/', require('./routes/homeRouter'))
app.use('/', require('./routes/poaadRouter'))

// Catch 404
app.use((req, res, next) => res.status(404).render('errors/404'))

// Error handling
app.use((err, req, res, next) => res.status(err.status || 500).render('errors/500'))

app.listen(port, () => console.log('Server running at http://localhost:' + port))
