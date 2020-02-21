const mongoose = require('../database')

Schema = mongoose.Schema

/**Estrutura de dados de usuario */
const MovieSchema = new Schema({
    title: {
        type: String,
        unique: true,
    },
    genre: {
        type: String,      
    },
    release_date: {
        type: String,
    },
    main_actors:{
        type: String,
    },
    plot:{
        type: String,        
    },
    trailer:{
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie