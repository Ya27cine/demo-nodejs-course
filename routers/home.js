const express = require('express')

const router = express.Router()

// page Home
router.get('/', (_, rep) => {
   // rep.send("Page Home")
   rep.render('index', {
       title: "My first page with Pug",
       content: "Tempor ad exercitation tempor ad esse irure nulla tempor."
   })
})

module.exports = router;