const { Schema, model } = require('mongoose');
const genreTypes = require('../constants/genreEnum');
const { isbnPattern } = require('../constants/patterns');

const bookSchema = Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: false },
    author: { type: String, required: true, minlength: 10 },
    rating: { type: Number, min: 0, max: 10 },
    isbn: { type: String, unique: true, match: isbnPattern },
    genre: { type: String, enum: Object.values(genreTypes), required: true },
  },
  { versionKey: false, timestamps: true }
);

const Book = model('book', bookSchema);

module.exports = Book;
