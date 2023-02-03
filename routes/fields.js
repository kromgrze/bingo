const { Field, validate } = require('../models/Fields')

const asyncMiddleware = require('../middleware/async')
const express = require('express');
const router = express.Router();

router.get('/getAll', asyncMiddleware(async (req, res) => {
    const fields = await Field.find();
    res.send(fields);
}));

router.get('/:userId', asyncMiddleware(async (req, res) => {
    const fields = await Field.find({
        _player: req.params.userId
    });

    res.send(fields);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let field = new Field({
        _player: req.body.userId,
        text: req.body.text
    });
    await field.save();

    res.status(201).send(field);
}));

router.delete('/:id', asyncMiddleware(async (req, res) => {
    const field = await Field.findByIdAndRemove(req.params.id);

    if (!field) return res.status(404).send('The genre with the given ID was not found.');

    res.send(field);
}));

module.exports = router;
