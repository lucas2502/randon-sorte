const express = require('express')



const userController = require("./controllers/UserController")
const eventController = require("./controllers/EventController")
const playerController = require('./controllers/PlayerController')
const winnerController = require("./controllers/WinnerController")

const routes = express.Router()



// Routes
/**
 * @swagger
 * paths:
 *  /user:
 *     get:
*      summary: Returns a list of users.
*      description: Optional extended description in CommonMark or HTML.
*      responses:
*        '200':    # status code
*          description: A JSON array of all users
*          content:
*            application/json:
*              schema: 
*                type: array
*                items: 
*                  type: string
*        '400': 
*           description: Error server
*        '404':
*           description: blablabla
*        deafult: 
*           description: É isso ae!
*/
routes.get('/user', userController.index)
routes.get('/user/:id', userController.show)
routes.post('/user', userController.store)
routes.put('/user/:id', userController.update)
routes.delete('/user/:id', userController.destroy)

routes.get('/event', eventController.index)
routes.get('/event/:event_id', eventController.show)
routes.post('/event/:user_id', eventController.store)
routes.put('/event/:event_id', eventController.update)
routes.delete('/event/:event_id', eventController.destroy)

routes.post('/event/:event_id/player', playerController.store)
routes.get('/players', playerController.index)
routes.get('/players/:event_id', playerController.show)
routes.delete('/players/:player_id', playerController.destroy)


routes.post('/winner/:event_id', winnerController.store)
routes.get('/winner/:event_id', winnerController.show)

module.exports = routes