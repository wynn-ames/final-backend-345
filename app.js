const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
require('dotenv/config')

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const categoriesRoute = require('./routes/categories')

app.use(bodyParser.json())
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/categories', categoriesRoute)
app.get('/', (req,res) => {
    res.send('test test 123')
})


mongoose.connect(process.env.CONNECTION_URL, () => console.log('connected to db'))

app.listen(process.env.PORT || 5000, console.log('listening'))