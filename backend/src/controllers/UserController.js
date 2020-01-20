const User = require("../models/User");///import conf user for insert in mongodb

//show(mostrar um unido), index(mostrar uma lista), store(criar), update(atualizar), destroy(deletar)

module.exports = {
    async index(req, res){
        const { email } = req.query;

        const users = await User.find()

        return res.json(users)
    },

    async store(req, res) {
        const { email, password } = req.body;//Receive info view

        let user = await User.findOne({ email })
        
        if(user) {
            return res.status(500).json({ error: 'User exists'});
        }

        user = await User.create({ email, password })//Use method create

        return res.json(user)//
    }
}