const express = require('express')

const userController = require("./controllers/UserController")
const eventController = require("./controllers/EventController")
const playerController = require('./controllers/PlayerController')
const winnerController = require("./controllers/WinnerController")

const routes = express.Router()

routes.post('/user', userController.store )
routes.get('/user', userController.index ) 

routes.get('/event', eventController.index)
routes.get('/event/:event_id', eventController.show)
routes.post('/event/:user_id', eventController.store)
routes.put('/event/:event_id', eventController.update)

routes.post('/event/:event_id/player', playerController.store)
routes.get('/players', playerController.index)
routes.get('/players/:event_id', playerController.show)

routes.post('/winner/:event_id', winnerController.store)
routes.get('/winner/:event_id', winnerController.show)

module.exports = routes