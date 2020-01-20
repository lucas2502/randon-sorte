const Event = require("../models/Event")
const Winner = require("../models/Winner")

module.exports = {
    async show(req, res) {
        const { event_id } = req.headers

        const event = await Event.findById(event_id)

        if(!event){
            return res.status(400).json({ error: 'Event not exist'});
            
        } else {
            return res.json({ data: { event: event.event, winner: event.winner, date: event.date }})
        }
    },

    async store(req, res) {
        const { event_id } = req.params

        let event = await Event.findById(event_id).populate('players')

        if(!event) {
            return res.status(400).json({ error: 'Event not exists'});
        }

        if(!event.players){
            return res.status(400).json({ error: 'Not exists players in event'});
        }

        let playerWinner = event.players[Math.floor(Math.random() * event.players.length)]  

        const winner = await Winner.create({
            event: event_id,
            winner: playerWinner
        })

        await Event.findOneAndUpdate({ _id: event._id },{ $push: { winner : playerWinner }},  {new: true}, 
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        
        return res.status(200).json({ data: winner })
    }
}