const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    event: String,
    date: String,
    winner: String,
    players: Array,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Event', EventSchema );