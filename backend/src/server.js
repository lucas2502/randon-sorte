const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()


 mongoose.connect('mongodb+srv://admin:admin@cluster0-rjekq.mongodb.net/test?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true
  })

/**
 * GET/POST/PUT/DELETE
 * 
 * req.query = Acessar query params (para filtros)
 * req.params = Acessar route params (para editção e delete)
 * req.body = Acessar corpo de quiseção (para criação e edição)
 */

app.use(express.json())
app.use(routes)

app.listen(3333)
