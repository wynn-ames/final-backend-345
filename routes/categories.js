const express = require('express');
const verify = require('./verifyToken')

const router = express.Router()

router.get('/',verify, (req, res) => {

    res.send(req.user)
})



module.exports = router