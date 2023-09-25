const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    title:{ 
        type: string,
        required: true
    },
    year:{ 
        type: Number,
        required: true
    },
    rating: Number
}, {timestamps: true}); 


module.exports = mongoose.model('Movies', moviesSchema);