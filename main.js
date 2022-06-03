console.log("MAIN")

require('http')
 .createServer(
     (req, rep) => {
        if(req.url === "/"){
        rep.write("Page Home")
        rep.end()
        }
}).listen(3000)
