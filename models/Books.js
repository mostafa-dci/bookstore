// Schema for books collection & export a Model
/**
 * title: String required, unique with error message max 20 with error message.
 * pages: Number required, min 10 with error message.
 * price: Number required
 * path: String, required
 * description: String NOT required
 * authorId: String required
 */
const mongoose = require('mongoose')

const booksSchema = mongoose.Schema({
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: [true, "This title already exist!"],
      maxlength: [20, "Title can not be longer than 20 characters long."],
    },
    pages: {
      type: Number,
      required: [true, "Pages is required."],
      min: [10, "Pages must be at least 10 characters long."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    path: {
      type: String,
      required: [true, "Path is required."],
    },
    description: {
      type: String,
      required: false,
    },
    authorId: {
      type: String,
      required: [true, "Author ID is required."],
    },
  }, {collection: "books"});

  const booksModel = mongoose.model("Books", booksSchema)

  module.exports = booksModel


