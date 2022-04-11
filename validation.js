const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schem = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string(),
        password: Joi.string()
    })
    
    return schem.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string()
    })
    
    return schema.validate(data)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation