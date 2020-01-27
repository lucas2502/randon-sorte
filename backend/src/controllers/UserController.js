const User = require("../models/User");///import conf user for insert in mongodb

//show(mostrar um unido), index(mostrar uma lista), store(criar), update(atualizar), destroy(deletar)

module.exports = {
    async index(req, res){
        const { email } = req.query;

        const users = await User.find()
        if(!users) {
            res.status(400).json({ error: "Not items in databse"})
        }

        return res.status(200).json(users)
    },

    async show(req, res) {
        const { id } = req.params;

        const user = await  User.findById(id)

        if(!user) {
            res.status(400).json({ error: "Not exist is id"})
        }

        return res.status(200).json({ data: user })
    },

    async store(req, res) {
        const { email, password } = req.body;//Receive info view

        let user = await User.findOne({ email })
        
        if(user) {
            return res.status(500).json({ error: 'User exists'});
        }

        user = await User.create({ email, password })//Use method create

        return res.json(user)//
    },

    async update(req, res) {
        const { email, password} = req.body;
        const { id } = req.params

        let user = await User.findById(id)

        console.log('user>', user)

        if(!user){
            return res.status(400).json({ error: 'User not exist'})
        }

        await User.findByIdAndUpdate({ _id: user._id },{ $set: { email, password}},  {new: true}, 
            function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        })

        return res.status(200).json({ data: await User.findById(id) })

    },

    async destroy(req, res) {
        const { id } = req.params;

        let user = await User.findById(id)

        if(!user){
            return res.status(400).json({ error: 'User not exist'})
        }
        
        await User.deleteOne({ _id: user._id },  {new: true}, 
            function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        })

        return res.status(200).json({ message: 'User deleted', data:  user })
    }
}