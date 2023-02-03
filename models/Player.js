const Joi = require('joi');
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const Player = mongoose.model('Player', playerSchema);

function validatePlayer(player) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isAdmin: Joi.boolean()
    };

    return Joi.validate(player, schema);
};

exports.Player = Player;
exports.validate = validatePlayer;
