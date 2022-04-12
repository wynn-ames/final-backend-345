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


const connectDB = async () => {

    try {
      await mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true})
      console.log('connected to mongodb!!!')
    } catch (err) {
        console.log(err)
    }
    
}

connectDB()

app.listen(process.env.PORT || 3000, console.log('listening at ' + process.env.PORT))
