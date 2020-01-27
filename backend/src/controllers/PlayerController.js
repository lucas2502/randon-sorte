const Event = require("../models/Event")
const Player = require("../models/Player")
const User  = require('../models/User')

module.exports = {
    async index(req, res){
        const players = await Player.find()

        return res.status(200).json({ data: players })
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

        let serachPlayer = await Player.find({ cpf, event})

        console.log('searchPlayer', serachPlayer)

        if(serachPlayer.length > 0){
            return res.status(400).json({ error: `CPF: ${cpf} exists`});
        }

        const createPlayer = await Player.create({
            event: event_id,
            name,
            cpf,
            email,
            phone
        })

        await Event.findByIdAndUpdate({ _id: event._id },{ $addToSet: { players: createPlayer }},  {new: true}, 
            function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        })
        //await createPlayer.populate('event').execPopulate()
        
        return res.json({ data: createPlayer})
    },

    async destroy(req, res) {
        const { player_id } = req.params

        let getPlayer = await Player.findById(player_id)

        if(!getPlayer){
            return res.status(400).json({ error: 'Player not exist'})
        }

        await Player.deleteOne({_id: getPlayer._id}, { new: true},
            function(error, sucess) {
                if(error) {
                    res.status(400).json({ error })
                } else {
                    res.status(200).json({ sucess})
                }
            }
        )

        if(!player_id){
            await Player.delete({}, { new: true},
                function(error, sucess) {
                    if(error) {
                        res.status(400).json({ error })
                    } else {
                        res.status(200).json({ sucess})
                    }
                }
            )   
        }

        return res.status(200).json({ message: 'Player deleted', data:  getEvent })
    }

}
