const bookModel = require('../models/book')
const authorModel = require('../models/authors')


/**
 * ### booksHandler
 * Will handle the request(/books) url.
 * And will load the view [mainTemplate](../views/mainTemplate.ejs) with content [books](../views/content/books.ejs), to send the response to the client.
 * This procedure will use the model [book Model](../models/book.js)
 * @author Mostafa Othman 
 * @param {object} _req  Request Object
 * @param {object} res Response Object
 */
const booksHandler = (_req, res)=>{
    res.render('mainTemplate', {
        title: "Books",
        content: "books",
        books: bookModel.getAllBooks()
    })
}

/**
 * ### bookHandler
 * 
 * this procedure will handle the request (books/BOOKID) where BOOKID supposed to be an id (NUMBER) for the book requested from browser.
 * 
 * This procedure uses [book Model](../models/book.js) to load the function [findBookById](../models/book.js) which will return the matched book as an object.
 * @author Mostafa Othman
 * @param {object} req Request
 * @param {object} res Response
 */
const bookHandler = (req, res)=>{
    let book =  bookModel.findBookById(req.params.bookId)
    if(book){
        res.render('mainTemplate', {title: book.title, content: 'book', book: book})
    }else{
        res.status(404).render('mainTemplate', {title: "NOT FOUND", content: '404'})
    }
}

/**
 * ### addBookGetHandler
 * This procedure will handle the `GET` request (books/add).
 * This procedure will use [authors Model](../models/authors.js) to load the function [getAllAuthors](../models/authors.js) to send authors array with the response, to let the user select author when creating a new book.
 * This procedure will load the view [mainTemplate](../views/mainTemplate.ejs) with content [addBook](../views/content/addBook.ejs) to render the response, and send it back to the client.
 * @author Mostafa Othman
 * @param {object} _req 
 * @param {object} res 
 */
const addBookGetHandler = (_req, res)=>{
    res.render('mainTemplate', {title: "Add Book", content: "addBook", authors: authorModel.getAllAuthors()})
}

/**
 * ### addBookPostHandler
 * This procedure will handle the `POST` request (books/add).
 * With data in request body:
 * ```json
 * {
 *  "title": "BOOK_TITLE",
 *  "authorId": "AUTHOR_ID",
 *  "pages": PAGE_COUNT,
 *  "price": PRICE,
 *  "description": "DESCRIPTION"
 * }
 * ```
 * This procedure will use [Book Model](../models/book.js) to load the `Promise Procedure` [saveBook](../models/book.js)
 *  which will save the new book in datasource (file/database)
 * This Procedure will sind an object as a response to the breowser with this two cases:
 * ```json
 * {
 *  "error": null // in case book saved successfuly
 * }
 * // or:
 * {
 *  "error": er, // he error from saveBook Promise
 *  "errorNum": 2 // for error-map
 * }
 * ```
 * @param {object} req 
 * @param {object} res 
 */
const addBookPostHandler = (req, res)=>{
    //console.log(req.body)
    const book = req.body
    bookModel.saveBook(book).then(()=>{
        //res.redirect('/books')
        res.json({error: null})
    }).catch(er=>{
        //res.status(404).render('mainTemplate', {title: "Book already Exist", content: '404', error: er})
        res.json({error: er})
    })
}


module.exports = {booksHandler, bookHandler, addBookGetHandler, addBookPostHandler}