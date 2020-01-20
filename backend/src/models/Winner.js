const mongoose = require('mongoose')

const WinnerSchema = new mongoose.Schema({
    winner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    event:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Winner', WinnerSchema );