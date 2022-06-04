const Joi  = require('joi')

const schemaValidateCourse = (course) => {
    const schema  = 
        Joi.object({
            title: Joi.string().alphanum().min(3).max(117)
        })
    return schema.validate( course ) 
}

module.exports = schemaValidateCourse;