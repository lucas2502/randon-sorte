const express = require('express')

const userController = require("./controllers/UserController")
const eventController = require("./controllers/EventController")
const playerController = require('./controllers/PlayerController')
const routes = express.Router()

routes.post('/user', userController.store )
routes.post('/event', eventController.store)
routes.get('/event', eventController.show)
routes.post('/event/:event_id/player', playerController.store)

module.exports = routes