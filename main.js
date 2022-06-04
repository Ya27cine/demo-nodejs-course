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
