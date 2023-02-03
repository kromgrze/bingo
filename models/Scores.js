const Joi = require('joi');
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    _player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    points: {
        type: Number,
        default: 0
    }
});

const Score = mongoose.model('Score', scoreSchema);

function validateScore(score) {
    const schema = {
        userId: Joi.string().required(),
        points: Joi.number()
    };

    return Joi.validate(score, schema);
};

exports.Score = Score;
exports.validate = validateScore;
