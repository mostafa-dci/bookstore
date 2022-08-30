# Controllers

## 1. [Books Controller](./bookscontroller.js)

### Functions & Procedures:
### booksHandler()
 * Type: Void.
 * booksHandler Procedure, will handle the request(/books) url.
 * Will load the view [mainTemplate](../views/mainTemplate.ejs) with content [books](../views/content/books.ejs), to render the response, and send it back to the client.
 * This procedure will use the model [book Model](../models/book.js) to load the books using function [getAllBooks]() to get all books.

 ### bookHandler
  * Type: Void.
  * This procedure will handle the request (books/BOOKID) where BOOKID supposed to be an id (NUMBER) for the book requested from browser.
 * This procedure uses [book Model](../models/book.js) to load the function [findBookById](../models/book.js#findBookById) with argument `bookId` as a string id of requested book which will return the matched book as an object if `book` exist, or `null` if not.
 * Will load the view [mainTemplate](../views/mainTemplate.ejs) with content [book](../views/content/book.ejs), to render the response, and send it back to the client if boook is not `null`, if so, it will use the content [404](../views/content/404.ejs) to render requested page Not Found.

 ### addBookGetHandler
 * Type: Void.
 * This procedure will handle the `GET` request (books/add).
 * This procedure will use [authors Model](../models/authors.js) to load the function [getAllAuthors](../models/authors.js) to send authors array with the response, to let the user select author when creating a new book.
 * This procedure will load the view [mainTemplate](../views/mainTemplate.ejs) with content [addBook](../views/content/addBook.ejs) to render the response, and send it back to the client.

 ### saveBook
  * Type: Void.
  * This procedure will handle the `POST` request (books/add).
 * With data in request body:
```json
{
  "title": "BOOK_TITLE",
  "authorId": "AUTHOR_ID",
  "pages": PAGE_COUNT,
  "price": PRICE,
  "description": "DESCRIPTION"
 }
```
 * This procedure will use [Book Model](../models/book.js) to load the `Promise Procedure` [saveBook](../models/book.js#saveBook)
 *  which will save the new book in datasource (file/database)
 * This Procedure will sind an object as a response to the breowser with this two cases:
```json
 {
  "error": null /* in case book saved successfuly */
 }
 /* or: */
 {
  "error": er, /* he error from saveBook Promise */
 }
```