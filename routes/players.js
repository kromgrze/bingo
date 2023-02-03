const { Player, validate } = require('../models/Player')
const asyncMiddleware = require('../middleware/async')
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res) => {
    const players = await Player.find().sort('name');
    res.send(players);
}));


router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let player = await Player.findOne({
        name: req.body.name
    })

    if (player) {
        return res.status(200).send(player);
    }

    player = new Player({
        name: req.body.name
    });
    player = await player.save();

    res.status(201).send(player);
}));

module.exports = router;
