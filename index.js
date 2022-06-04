const express = require('express');
const app =  express()
const Joi =  require('joi')
//const port = process.env || 50000;
app.use( express.json())

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
    
    const schema  = Joi.object({
        title: Joi.string().alphanum().min(3).max(117)
    })
    const {error, value}  =  schema.validate( req.body )
    if(error){
        rep.status(400).send( error.details )
    }

    let new_course = {id: new Date().getTime() , title: value.title };
    courses = [new_course, ...courses]
    rep.status(201).send( new_course )
})

// find a course :
app.get('/api/courses/:id', (req, rep) => {
    const course = 
        courses.find(course => course.id == req.params.id)
    if(! course)
        rep.status(404).send("Not Found !!")
    else    
        rep.status(200).send( course )
})


app.listen(4000, () => console.log("server is starting with port ") )