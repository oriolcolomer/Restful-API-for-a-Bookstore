const mongoose = require('mongoose');
const { Schema } = mongoose;
const bookSchema = new Schema({
    title: String,
    author: String,
    published_year: Number,
    pages: Number,
    genre: String
});

    module.exports = mongoose.model('Book',bookSchema);