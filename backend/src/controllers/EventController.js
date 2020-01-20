const Event = require("../models/Event")
const User = require('../models/User')
const Player = require('../models/Player')

module.exports = {
    async index(req, res){
        const events = await Event.find()

        return res.json({ data: events})
    },

    async show(req, res) {
        const { event_id } = req.headers

        const event = await (await Event.findById(event_id)).populate(['user', 'players', 'winner'])

        if(!event){
            return res.status(400).json({ error: 'Event not exists'});
        }

        return res.json({ data: event.populate(['user', 'players', 'winner'])})   
    },

    async store(req, res) {
        const { event, date, players } = req.body
        const { user_id } = req.headers

        const user =  await User.findById(user_id)
        
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

        await Promisse.all(players.map(async player => {
            const playersEvent = new Player({ ...player, event: event._id})

            await playersEvent.save()
            
            createEvent.players.push(playersEvent)
        }))

        createEvent.save()

        return res.json({ data: createEvent })
    },

    async update(req, res) {
        const { player } =  req.body
        console.log('req.body', req.body)
        const { event_id } = req.headers
        console.log('event_id', req.headers)

        const event = await Event.findById(event_id)
        console.log('Event', Event)
        if(!event){
            return res.status(400).json({ error: 'event not exists'});
        } 
        
        let addPlayers = await Event.findByIdAndUpdate( event_id, {$push: {
            players: player
        }}, { new: true })
        console.log('players', players)

        return res.json({ data : addPlayers })
    }
}