const { Score, validate } = require('../models/Scores')
const asyncMiddleware = require('../middleware/async')
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res) => {
    const scores = await Score.find().sort({'points': 'desc'}).populate('_player').exec();

    res.send(scores);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let response = await Score.findOneAndUpdate(
        {_player: req.body.userId},
        {$inc: {'points': req.body.points}},
        {new: true});

    if (response) {
        return res.send(response);
    }

    let score = new Score({
        _player: req.body.userId,
        points: req.body.points
    });
    await score.save();

    res.status(201).send(score);
}));

module.exports = router;
