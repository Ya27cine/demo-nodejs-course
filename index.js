const express = require('express');
const logout = require('./logged');

const app =  express()
const Joi =  require('joi')
//const port = process.env || 50000;

//  Middleware 
app.use( express.json() )
app.use( express.urlencoded() )
app.use( express.static('public'))
app.use( (req, rep, next) => logout.logged(req, rep, next)  )

app.use( (req, rep, next) => {
    console.log("auth")
    next()
})

// data
let courses = [
    {id: 0, title: 'Angular'},
    {id: 1, title: 'ReactJs'},
    {id: 2, title: 'VueJs'},
]

// page Home
app.get('/', (_, rep) => {
    rep.send("Page Home")
})

// show courses
app.get('/api/courses', (_, rep) => {
    rep.send( courses )
})

// add a course :
app.post('/api/courses', (req, rep) => {
    const {error, value} = schemaValidateCourse(  req.body )
    if(error){
        rep.status(400).send( error.details )
        return;
    }
    // create new course 
    let new_course = {id: new Date().getTime() , title: value.title };
    // push course in courses
    courses = [new_course, ...courses]
    rep.status(201).send( new_course )
})

// update a course 
app.put("/api/courses/:id", (req, rep) => {
    const {error, value} = schemaValidateCourse(  req.body )
    if(error) rep.status(400).send( error.details )
    // get a course :
    const course =  courses.find(course => course.id == req.params.id)
    if(!course)     rep.status(404).send("Not Found !!")
    // update title
    course.title = value.title;
    rep.status(200).send( course ) 
})

// delete a course 
app.delete("/api/courses/:id", (req, rep) => {
    // get a course :
    const course =  courses.find(course => course.id == req.params.id)
    if(!course) {
        rep.status(404).send("Not Exist !!")
        return;
    }    
    // get all course expert course(id):
    new_courses =  courses.filter(_ => _.id !== course.id)
    courses = new_courses  
    rep.status(204).send( {} ) 
})

// find a course :
app.get('/api/courses/:id', (req, rep) => {
    const course =  courses.find(course => course.id == req.params.id)
    if(!course)     rep.status(404).send("Not Found !!")
    else            rep.status(200).send( course )
})

const schemaValidateCourse = (course) => {
    const schema  = 
        Joi.object({
            title: Joi.string().alphanum().min(3).max(117)
        })
    return schema.validate( course ) 
}


app.listen(4000, () => console.log("server is starting with port ") )