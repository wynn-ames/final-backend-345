const bcrypt = require('bcryptjs');
const express = require('express');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken')


const {registerValidation, loginValidation} = require('../validation')

const router = express.Router()


router.post('/', async (req, res) => { 

    //validate data
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error)

    const usr = await Users.findOne({email: req.body.email})
    if(!usr){
        return res.status(400).send('email! or password is wrong')
    }

    const validPass = await bcrypt.compare(req.body.password, usr.password)

    if(!validPass) {

        return res.status(400).send('email or password! is wrong')
        
    }

    const token = jwt.sign({_id: usr._id}, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).send({
        name: usr.name,
        phone: usr.phone,
        email: usr.email
    })
    
    
    
    

    

    
        
    
})

module.exports = router