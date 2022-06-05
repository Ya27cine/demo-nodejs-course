const mongoose = require('mongoose')

module.exports  = mongoose.Schema({

    /** field : Name */
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 100
    },

    /** field : Author */
    author: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 250,
        uppercase: true // Active [conversion majuscules]
    },

    /** field : Category */
    category: {
        type: String,
        enum: ['Web', 'Mobile', 'Security']
    },

    /** field : Tags */
    tags: {
        type: Array,
        validate:{
            validator: function(v) { return v && v.length > 0},
            message: "Course must have at least one tag !"
        }
    },

    /** field : date */
    date: {type: Date, default: Date.now},

    /** field : isPublished */
    isPublished: Boolean,

    /** field : Price */
    price: {
        type: Number, 
        required: function(){ return this.isPublished} ,
        min: 1,   // min 1$
        max: 700, // max 700$
        set: v => Math.round( v ),
        get: v => Math.round( v ),
    }
})