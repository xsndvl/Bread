const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const bread = require('../models/bread')
const breads = express.Router()
const Bread = require("../models/bread")
const breadSeedData = require("../models/seed.js")
const Baker = require("../models/baker")

// breads.get("/", (req, res) =>{
//     Bread.find()
//         .then(foundBreads => {
//             res.render("index", {
//                 breads: foundBreads,
//                 title: "Index Page"
//             })
//         })
// })

breads.get('/', async (_req, res, next) => {
    try {
      const foundBakers = await Baker.find();
      const foundBreads = await Bread.find();
      res.render('index', {
        breads: foundBreads,
        bakers: foundBakers,
        title: 'Index Page',
      });
    } catch (err) {
      next(err);
    }
  });

//Edit
// breads.get('/:id/edit', (req, res) =>{
//     Baker.find()
//     .then(foundBakers => {
//         Bread.findByIdAndUpdate(req.params.id)
//         .then(foundBread => {
//             res.render('edit',{
//                 bread: foundBread
//                 bakers: foundBakers
//             })
//         })
//     })
// })

breads.get('/:id/edit', async (req, res, next) => {
    try {
      const foundBakers = await Baker.find();
      const foundBread = await Bread.findById(req.params.id);
      res.render('edit', {
        bread: foundBread,
        bakers: foundBakers,
      });
    } catch (err) {
      next(err);
    }
  });

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
            res.status(404)
        })
    
  })

  //SHOW
  breads.get("/:arrayIndex", (req, res) =>{
    Bread.findById(req.params.arrayIndex)
        .then(foundBread => {
            res.render("show", {
                bread: foundBread
            })
            const bakedBy = foundBread.getBakedBy()
            console.log(bakedBy)
        })
        .catch(err => {
            res.status(404)
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