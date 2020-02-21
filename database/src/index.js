const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

require('./controllers/auth')(app)
require('./controllers/moviesControll')(app)

app.listen(3030)