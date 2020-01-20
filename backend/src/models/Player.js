const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 50,
        required: true,
    },
    cpf: {
        type: String,
        max: 11,
        required: true,
    },
    email: {
        type: String,
        max: 20,
        required: true,
    },
    phone: {
        type: String,
        max: 12,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Player', PlayerSchema)