//DEPENDENCIES
const express = require('express')
const breadsController = require("./controllers/breads_controllers")

//CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
const methodOverride = require("method-override")
console.log(PORT)

//MIDDLEWARE
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('views', __dirname + '/views')
app.set("view engine", "jsx")
app.engine('jsx', require('express-react-views').createEngine())
app.use(methodOverride('_method'))

//ROUTES
app.get('/', (req, res) =>{
    res.send('Welcome to an Awesome App about Breads!')
})

app.use("/breads", breadsController)

//Listen
app.listen(PORT, () =>{
    console.log('listening at port', PORT)
})

// 404 Page
app.get("*", (req, res) =>{
    res.status(404).send('404')
})