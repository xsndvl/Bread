//DEPENDENCIES
const express = require('express')
const breadsController = require("./controllers/breads_controllers")

//CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
console.log(PORT)

//ROUTES
app.get('/', (req, res) =>{
    res.send('Welcome to an Awesome App about Breads!')
})

app.use("/breads", breadsController)

//Listen
app.listen(PORT, () =>{
    console.log('nomming at port', PORT)
})