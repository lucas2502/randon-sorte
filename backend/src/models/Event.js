const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    event: {
        type: String,
        max: 50,
        required: true,
    },
    date: {
        type: String,
        max: 10,
        required: true,
    },
    winner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Event', EventSchema );