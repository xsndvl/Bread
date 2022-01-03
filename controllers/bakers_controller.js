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

module.exports = baker