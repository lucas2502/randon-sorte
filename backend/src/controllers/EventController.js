const Event = require("../models/Event")
const User = require('../models/User')
const Player = require('../models/Player')

module.exports = {
    async index(req, res){
        const events = await Event.find().populate(['players', 'winner'])

        return res.json({ data: events})
    },

    async show(req, res) {
        const { event_id } = req.headers

        const event = await Event.findById(event_id).populate(['user', 'players', 'winner'])

        if(!event){
            return res.status(400).json({ error: 'Event not exists'});
        }

        return res.json({ data: event.populate(['user', 'players', 'winner'])})   
    },

    async store(req, res) {
        const { event, date, players } = req.body
        const { user_id } = req.headers

        let user =  await User.findById(user_id)
        
        if(!user){
            return res.status(400).json({ error: 'User not exists'});
        }

        let eventSearch = await Event.findOne({ event })
        
        if(eventSearch){
            return res.status(500).json({ error: 'Event is exists'});
        }

        const createEvent = await Event.create({
            user: user_id,
            event,
            date
        }) 

        return res.status(200).json({ data: createEvent})
    },

    async update(req, res) {
        const { event, date } =  req.body
        const { event_id } = req.headers

        let getEvent = await Event.findById(event_id)
        
        if(!getEvent){
            return res.status(400).json({ error: 'event not exists'});
        } 
        
        await Event.findByIdAndUpdate( { _id: getEvent._id}, { $set: {
            event, date
        }}, { new: true })

        return res.json({ data : await Event.findById(event_id) })
    },

    async destroy(req, res) {
        const { event_id } = req.params

        let getEvent = await Event.findById(event_id)

        if(!getEvent){
            return res.status(400).json({ error: 'Event not exist'})
        }

        await Event.deleteOne({_id: getEvent._id}, { new: true},
            function(error, sucess) {
                if(error) {
                    res.status(400).json({ error })
                } else {
                    res.status(200).json({ sucess})
                }
            }
        )

        return res.status(200).json({ message: 'Event deleted', data:  getEvent })
    }
}