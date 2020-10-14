const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

require('dotenv').config()

const messages = require('./db/Messages')

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res)=> {
    res.json({
        msg: 'Full stack message board 🎉'
    })
})

app.get('/messages', (req, res) => {
    messages.getAll().then(messages => res.json(messages))
})

app.post('/messages', (req, res) => {
    console.log(req.body)
    messages.create(req.body)
        .then(message => res.json(message))
        .catch(err => res.status(500).json(err))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running at port ${port}`))