const { func } = require('joi')
const Joi = require('joi')
const db = require('./connection')

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
})

const messages = db.get('messages')

const getAll = () => messages.find()

const create = (message) => {
    if(!message.username) message.username = 'Anonymous'

    const result = schema.validate(message)
    if(result.error == null) {
        message.created = new Date()
        console.log(message)
        return messages.insert(message)
    } else {
        console.log('rejected da maamu')
        return Promise.reject(result.error)
    }
}

module.exports = {
    getAll,
    create
}