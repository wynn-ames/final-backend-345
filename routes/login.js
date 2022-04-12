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
    
<<<<<<< HEAD
    res.header('auth-token', token).send(usr)
=======
    res.header('auth-token', token).send(token)
>>>>>>> ad0e6ec7abb30a3f6c428cda83879cd60a98e4dc
    
    
    
    

    

    
        
    
})

module.exports = router