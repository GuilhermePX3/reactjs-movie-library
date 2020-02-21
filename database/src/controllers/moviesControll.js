const express = require('express')

const Movie = require('../models/movie')

const router = express.Router()


//LISTAR FILMES UTILIZANDO A ID DO USUARIO
router.get('/:user', async (req, res) => {

    try{
        const movie = await Movie.find({user:req.params.user})

        res.send({  movie })       

    }catch (err){
        return res.status(400).send({ error:'Error loading movies.' })
    }

})

//CRIAR FILME COM DADOS INFORMADOS NO FRONT, COM BASE DA ID DO USUARIO
router.post('/', async (req, res) => {

    try{
        const movie = await Movie.create(req.body)

        res.send({  movie })       

    }catch (err){
        return res.status(400).send({ error:'Error saving movie.' })
    }

})

router.put('/:movieId', async (req, res) => {
    res.send({ user: req.userId })
})

router.delete('/:movieId', async (req, res) => {

    try{
        const movie = await Movie.findByIdAndRemove(req.params.movieId)

        return res.send()       

    }catch (err){
        return res.status(400).send({ error:'Error deleting movie.' })
    }

})

module.exports = app => app.use('/movie', router)