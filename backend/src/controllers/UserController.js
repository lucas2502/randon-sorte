const User = require("../models/User");///import conf user for insert in mongodb

module.exports = {
    async store(req, res) {
        const { email } = req.body;//Receive info view

        let user = await User.findOne({ email })
        
        if(!user){
           user = await User.create({ email })//Use method create
        }
        return res.json({ user })//
    }
}