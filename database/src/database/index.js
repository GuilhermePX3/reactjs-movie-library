const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/movielib', { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.Promise = global.Promise

module.exports = mongoose

