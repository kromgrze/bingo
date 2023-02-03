const Joi = require('joi');
const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    _player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    text: {
        type: String,
        minlength: 3,
        maxLength: 50
    }
});
const Field = mongoose.model('Field', fieldSchema);

function validateField(field) {
    const schema = {
        userId: Joi.string().required(),
        text: Joi.string().min(3).max(50).required(),
    };

    return Joi.validate(field, schema);
};

exports.Field = Field;
exports.validate = validateField;
