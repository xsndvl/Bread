const express = require('express')
const breads = express.Router()
const Bread = require("../models/bread")

breads.get("/", (req, res) =>{
    // res.send(Bread)
    res.render("Index", {
        breads: Bread
    })
})

breads.get("/:arrayIndex", (req, res) =>{
    // res.send(Bread[req.params.arrayIndex])
    res.render("Show", {
        bread: Bread[req.params.arrayIndex]
    })
})

module.exports = breads