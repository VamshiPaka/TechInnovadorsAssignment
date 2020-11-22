const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    publication:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publishedAt:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Book_model',BookSchema);