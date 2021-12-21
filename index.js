//DEPENDENCIES
const express = require('express')
const breadsController = require("./controllers/breads_controllers")

//CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
console.log(PORT)

//MIDDLE WEAR
app.use(express.static("public"))
app.set('views', __dirname + '/views')
app.set("view engine", "jsx")
app.engine('jsx', require('express-react-views').createEngine())

//ROUTES
app.get('/', (req, res) =>{
    res.send('Welcome to an Awesome App about Breads!')
})

app.use("/breads", breadsController)

//Listen
app.listen(PORT, () =>{
    console.log('listening at port', PORT)
})