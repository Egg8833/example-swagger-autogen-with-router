/*
 * Run the project and access the documentation at: http://localhost:3000/doc
 *
 * Use the command below to generate the documentation without starting the project:
 * $ npm start
 *
 * Use the command below to generate the documentation at project startup:
 * $ npm run start-gendoc
 */


const express = require('express')
const app = express()
app.use(express.json())

const { swaggerSpec, swaggerUi } = require('../swagger-jsdoc')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const router = require('./routes')
app.use(router)

app.listen(3000, () => {
  console.log('Server is running!\nAPI documentation: http://localhost:3000/doc')
})
