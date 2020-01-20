const Event = require("../models/Event")
const Player = require("../models/Player")
const User  = require('../models/User')

module.exports = {
    async index(req, res){
        const players = await Player.find()

        return res.json({ data: players })
    },

    async show(req, res) {
        const { event_id, user_id } = req.headers

        const playersEvent = await Event.findById(event_id).populate('players')

        const allowAcess = await User.findById(user_id) 
        console.log('allowAcess', allowAcess)

        if(allowAcess){
            return res.json({ data: playersEvent.players})
        } else {
            return res.status(400).json({ error: 'Not acess'});
        }
    },

    async store(req, res) {
        const { name, cpf, email, phone } = req.body
        const { event_id } = req.params

        let event = await Event.findById(event_id)

        if(!event) {
            return res.status(400).json({ error: 'Event not exists'});
        }

        const createPlayer = await Player.create({
            event: event_id,
            name,
            cpf,
            email,
            phone
        })
        const player = event.players.map( player => player === createPlayer )

        if(player){
            console.log('player', player)
            return res.status(400).json({ error: 'Player exist'})
        }

        await Event.findOneAndUpdate({ _id: event._id },{ $push: { players : createPlayer.populate('players') }},  {new: true}, 
            function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        })
        //await createPlayer.populate('event').execPopulate()
        
        return res.json({ data: createPlayer})
    }
}