exports.logged =  (req, rep, next) => {
    console.log("login")
    next()
}