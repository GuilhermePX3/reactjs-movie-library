const mongoose = require('../database')

/**Estrutura de dados de usuario */
const MovieSchema = new mongoose.Schema({
    Title: {
        type: String,
    },
    Genre: {
        type: String,       
    },
    Year: {
        type: String,
    },
    Actors:{
        type: String,
    },
    Plot:{
        type: String,        
    },
    Poster:{
        type: String,
    },
    Trailer:{
        type: String,
    },
    user:{
        type: String,
    },
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie