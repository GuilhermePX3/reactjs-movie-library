const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/movielib', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });


mongoose.Promise = global.Promise

module.exports = mongoose