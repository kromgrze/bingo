const express = require('express');

const players = require('../routes/players');
const scores = require('../routes/scores');
const fields = require('../routes/fields')

module.exports = function(app) {
    app.use(express.json());

    app.use('/api/players', players);
    app.use('/api/scores', scores);
    app.use('/api/fields', fields);
}
