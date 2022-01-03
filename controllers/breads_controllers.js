const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const bread = require('../models/bread')
const breads = express.Router()
const Bread = require("../models/bread")
const breadSeedData = require("../models/seed.js")

breads.get("/", (req, res) =>{
    Bread.find()
        .then(foundBreads => {
            res.render("index", {
                breads: foundBreads,
                title: "Index Page"
            })
        })
})

breads.get("/new", (req, res)=>{
    res.render("New")
})

//Edit
breads.get('/:id/edit', (req, res) =>{
    Bread.findByIdAndUpdate(req.params.id)
    .then(foundBread => {
        res.render('edit',{
            bread: foundBread
        })
    })

})

// UPDATE
breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(updatedBread => {
            console.log(updatedBread)
            res.redirect(`/breads/${req.params.id}`)
        })
        .catch(err => {
            res.send(404)
        })
    
  })

  //SHOW
breads.get("/:arrayIndex", (req, res) =>{
    Bread.findById(req.params.arrayIndex)
        .then(foundBread => {
            const bakedBy = foundBread.getBakedBy()
            console.log(bakedBy)
            res.render("show", {
                bread: foundBread
            })
        })
        .catch(err => {
            res.send(404)
        })
})

breads.post("/",(req, res) =>{
    if(!req.body.image){
        req.body.image = undefined
    }
    if(req.body.hasGluten === "on"){
        req.body.hasGluten = true
    } else{
        req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect("/breads")
})

//Delete
breads.delete('/:id',(req, res)=>{
    Bread.findByIdAndDelete(req.params.id)
        .then(deletedBread => {
            console.log(deletedBread)
            res.status(303).redirect("/breads")
        })
})

//SEED
breads.get("/data/seed", (req, res) => {
    Bread.insertMany(breadSeedData)
    .then(createdBreads => {
        res.redirect("/breads")
    })
})

module.exports = breads