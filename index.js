//DEPENDENCIES
const express = require('express')
const breadsController = require("./controllers/breads_controllers")
const mongoose = require("mongoose")
var bodyParser = require('body-parser');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB CONNECTION
mongoose.connect(
    process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connected to database")
)

//Bakers
const bakersController = require("./controllers/bakers_controller")
app.use("/bakers", bakersController)

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