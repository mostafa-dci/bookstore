const books = require("../data/books.json")[0].books;
const authorModel = require("./authors");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param {Object} book as an Object
 * @returns
 */
const saveBook = (book) => {
  return new Promise((resolve, reject) => {
    // check if the title & same author exist, if so, error message
    let exist = books.find((b) => b.title === book.title);
    if (exist) {
      reject({
        errorNum: 5,
        message: `The book "${book.title}" is already exist!`,
      });
    } else {
      // assign an id to the book
      book.id = books.length > 0 ? books[books.length - 1].id + 1 : 0;
      //Search for the author, maching authorId
      let authorName = authorModel
        .getAllAuthors()
        .find((au) => au.id === book.authorId).name;
      book.author = authorName;
      // ready to store
      books.push(book);
      // to follow the same strucure books.json file
      let contentFile = [{ books: books }];

      fs.writeFile(
        path.join(__dirname, "../data/books.json"),
        JSON.stringify(contentFile),
        (error) => {
          if (error) {
            //res.json(error)
            reject(error);
          } else {
            //res.redirect('/books')
            resolve();
          }
        }
      );
    }
  });
};

/**
 * ### findBookById
 * This Function will return a book as an object, this book is matching with `bookId` parameter which is comming from `GET` request as a param from browser.
 * @param {String} bookId
 * @returns {object} book object if exist, or null if not.
 */
const findBookById = (bookId) => {
  // using .find method to look up the matching object in books array if the id and bookId are matching.
  return books.find((b) => b.id == bookId);
};

const getAllBooks = () => {
  return books;
};

module.exports = { saveBook, findBookById, getAllBooks };
