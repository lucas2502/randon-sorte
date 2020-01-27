const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:3333"]
    }
  },
  // ['.routes/*.js']
  apis: ["routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



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

app.use(cors());
app.use(express.json())
app.use(routes)


app.listen(5050, () => {
  console.log('Serve on!')
})
