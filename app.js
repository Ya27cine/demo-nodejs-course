
// const os = require('os')
// const fs = require('fs')

// console.log( os.totalmem() )
// const x = fs.readdir('./', function(a,b){
//      if(b) console.log(b) 
// })

// const path = require('path')
// const  {name}  = path.parse(__filename)
// //console.log(  name )








const classEventEmitter =  require('events');
const EventEmitter = new classEventEmitter

const EVENT_PRE_VALIDATION = "pre.validation"

EventEmitter.on(EVENT_PRE_VALIDATION, event => console.log( event.data ) )

EventEmitter.emit(EVENT_PRE_VALIDATION, {
    data: {
        id:1, 
        name:"khelifa Yassine", 
        mobile:'07 64 54 54 06'
    }
})
