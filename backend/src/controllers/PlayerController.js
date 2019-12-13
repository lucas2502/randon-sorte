//const Event = require("../models/Event")
const Player = require("../models/Player")

module.exports = {
    async store(req, res) {
        const { name, cpf, email, phone } = req.body
        const { event_id } = req.params

        const createPlayer = await Player.create({
            name: name,
            cpf: cpf,
            email: email,
            phone: phone,
            event: event_id
        })

        await createPlayer.populate('event').execPopulate()
        
        return res.json(createPlayer)
    }
}