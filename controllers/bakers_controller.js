const express = require('express');
const baker = express.Router();
const Baker = require('../models/baker');
const bakerSeedData = require('../models/baker_seed');

// Index: 
baker.get('/', async (_req, res, next) => {
    try {
      const foundBakers = await Baker.find().populate('breads');
      res.send(foundBakers);
    } catch (err) {
      next(err);
    }
  });               

baker.get("/data/seed", async (req, res) => {
    try {
        await Baker.insertMany(bakerSeedData)
        res.redirect("/breads")
        console.log("trying")
    } catch (err) {
        res.send("ERROR")
    }
})

// Show: 
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})

//Delete
// baker.delete('/:id', async (req, res, next) => {
//     try {
//       await Baker.findByIdAndDelete(req.params.id);
//       res.status(303).redirect('/breads');
//     } catch (err) {
//       next(err);
//     }
// });

// delete
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id) 
      .then(deletedBaker => { 
        res.status(303).redirect('/breads')
      })
})

module.exports = baker