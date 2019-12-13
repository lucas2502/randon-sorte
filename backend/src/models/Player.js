const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
    name: String,
    cpf: String,
    email: String,
    phone: String,
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
})

module.exports = mongoose.model('Player', PlayerSchema)