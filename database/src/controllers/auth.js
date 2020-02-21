/** Classe destinada para registro e login de usuarios */

const express = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const router = express.Router()


/** Rota para registro do usuário */
router.post('/register', async (req, res) => {

    const { email } = req.body


    try{
        if(await User.findOne({ email }))
        return res.status(400).send({ error: 'This email is already in use.'})

        const user = await User.create(req.body)

        user.password = undefined

        res.send({ user })        

    }catch (err){

        return res.status(400).send({ error:'Error during registration.' })

    }
})

/** Rota para login do usuário */
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({email}).select('+password')

    if(!user){
        return res.status(400).send({error:'User does not exists'})
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error:'Password not match'})
    }

    user.password = undefined

    

    res.send({ user })

})

module.exports = app => app.use('/auth', router)