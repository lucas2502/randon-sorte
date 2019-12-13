const Event = require("../models/Event")
const User = require('../models/User')

module.exports = {
    async show(req, res){
        const { event } = req.query;

        const events = await Event.find({ createEvent: event  })

        return res.json(events)
    },

    async store(req, res) {
        const { event, date, winner, players } = req.body
        const { user_id } = req.headers

        const user =  await User.findById(user_id)

        if(!user){
            return res.status(400).json({ error: 'User not exists'});
        }

        const createEvent = await Event.create({
            user: user_id,
            event: event,
            date: date,
            winner: winner,
            players: players
        }) 

        return res.json({ createEvent })
    }
}