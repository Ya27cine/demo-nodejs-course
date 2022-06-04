
console.log("MAIN")

require('http')
 .createServer(
     (req, rep) => {
        if(req.url === "/"){
        rep.write("Page Home")
        rep.end()
        }
}).listen(3000)


// console.log("Hello world !")
// const _ = require('lodash')
// console.log( _.take([9,13,5,6,8,12,3,4], 3))


// const prostam = require('prostam');
// console.log( prostam.sortAlgo([2,1,6,0,5]) )

// const os = require('os')
// const fs = require('fs')

// console.log( os.totalmem() )
// const x = fs.readdir('./', function(a,b){
//      if(b) console.log(b) 
// })

// const path = require('path')
// const  {name}  = path.parse(__filename)
// //console.log(  name )




// const classEventEmitter =  require('events');
// const EventEmitter = new classEventEmitter

// const EVENT_PRE_VALIDATION = "pre.validation"

// EventEmitter.on(EVENT_PRE_VALIDATION, event => console.log( event.data ) )

// EventEmitter.emit(EVENT_PRE_VALIDATION, {
//     data: {
//         id:1, 
//         name:"khelifa Yassine", 
//         mobile:'07 64 54 54 06'
//     }
// })
