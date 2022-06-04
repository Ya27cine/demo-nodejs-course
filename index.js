const express   = require('express');
const helmet    = require('helmet');
const morgan    = require('morgan');
const logout    = require('./middleware/logged');
const config    = require('config');
const courses   = require('./routers/courses')
const home      = require('./routers/home')

// Create app :
const app =  express()

/**
 *
 *  Middleware
 **/   
app.use( express.json() )
app.use( express.urlencoded() )
app.use( express.static('public'))
// HTTP request logger middleware (morgan)
if( app.get('env') == "development" )
    app.use( morgan('tiny') )
// Module that helps in securing HTTP headers (helmet)
app.use( helmet() )
app.use( (req, rep, next) => logout.logged(req, rep, next)  )
app.use( (req, rep, next) => {
    console.log("auth")
    next()
})

// Template PUG :
app.set("view engine", 'pug')
app.set("views", './views')


// Routers :
app.use('/', home)
app.use('/api/courses', courses)


// start server : 
app.listen(4000, () => console.log("server is starting with port ") )


//console.log( config.get("mailer.password"))
