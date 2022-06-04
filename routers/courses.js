const express    = require('express')
const Validator  = require('../service/Validator')

const router = express.Router()

// data
let courses = [
    {id: 0, title: 'Angular'},
    {id: 1, title: 'ReactJs'},
    {id: 2, title: 'VueJs'},
]

// show courses
router.get('/', (_, rep) => {
    rep.send( courses )
})

// add a course :
router.post('/', (req, rep) => {
    const {error, value} = Validator.schemaValidateCourse(  req.body )
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
router.put("/:id", (req, rep) => {
    const {error, value} = Validator.schemaValidateCourse(  req.body )
    if(error) rep.status(400).send( error.details )
    // get a course :
    const course =  courses.find(course => course.id == req.params.id)
    if(!course)     rep.status(404).send("Not Found !!")
    // update title
    course.title = value.title;
    rep.status(200).send( course ) 
})

// delete a course 
router.delete("/:id", (req, rep) => {
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
router.get('/:id', (req, rep) => {
    const course =  courses.find(course => course.id == req.params.id)
    if(!course)     rep.status(404).send("Not Found !!")
    else            rep.status(200).send( course )
})


module.exports = router;
