# Tasks For Today
> Today we will display all books in books page, so that each book will be like one [bootstrap card](https://getbootstrap.com/docs/5.0/components/card/), and we will make a dynamic route for one book by id to display more info about one specific book.

## 1- Display All Books
If we visit this url: `localhost:3000/books`, we should display all books in data folder [books.json](./data/books.json) Folder.    
1. Take a look at the file [books.json](./data/books.json) file in [data](./data/) folder, this file contains an array of objects `books`, see one object as an example of on book.
2. In [bookscontroller.js](./controllers/bookscontroller.js) file, import the [books.json](./data/books.json) to use it as a resource.
3. In [bookscontroller.js](./controllers/bookscontroller.js) file, update the method `booksHandler` to send all books to the render file `mainTemplate` to be ready to render in [books.ejs](./views/content/books.ejs) file. to be similar like this:
```js
const booksHandler = (req, res)=>{
    res.render('mainTemplate', {
        title: "Books",
        content: "books",
        books: books// this variable, the imported books.json content
    })
}
```
4. In the file [books.ejs](./views/content/books.ejs), you should be able to read all books object as `books`.
5. Now, in [books.ejs](./views/content/books.ejs) file, we want to display each 3 books in one row, following the bootstrap layout, so the idea is to make each 3 cards in one row, make the following html structure:
```html
<h1 class="text-center">All Books</h1>
<section>
    <div class="row">
        <div class="col-md-12">
            <!-- START RENDERING PART FOR EACH BOOK -->
            <!-- THIS DIV: "row" below SHOULD BE EACH 3 BOOKS AND ALSO SHOULD BE FROM THE BEGINNING -->
            <div class="row">
            <!-- Example for one book -->
                <div class="col-md-4 mb-3">
                    <div class="card bg-dark">
                        <div class="card-body">
                            <h5 class="card-title">BOOK TITLE</h5>
                            <p class="card-text">BOOK DESCRIPTION</p>
                        </div>
                        <a href="#" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div><!-- THIS CLOSING DIV SHOULD BE EACH 3 BOOKS, AND ALSO AT THE END OF LAST BOOK -->
        </div>
    </div>
</section>
```
you can use `.forEach` or `for loop` to loop throw books object, dont forget to replace `BOOK TITLE` and `BOOK DESCRIPTION` with the actual data for each book. 

6. Add the following style stuff to [style.css](./public/css/style.css) file.
```css
.card{
    min-height: 40vh;
}
.card .card-text{
    height: 35vh;
    width: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
    text-align: justify;
    padding: 2%;
    padding-right: 3%;
}
/* scroller style */
.card .card-text::-webkit-scrollbar {
    width: 5px;
    background-color: #2e2e2e;
}
.card .card-text::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(246, 180, 0, 0.3);
}
.card .card-text::-webkit-scrollbar-thumb {
    background-color: rgb(0, 0, 0);
    border-radius: 5px;
}
.card h5{
    text-align: center;
    font-weight: bold;
}
.card a{
    width: 50%;
    margin: auto;
    margin-bottom: 10px;
}
```
7. Sure you can add your own styling for the card, changing colors, font ...etc.

## Dyanmic Route for Each book
> The idea is to create a dyanmic rout for each book, so that if we visit `localhost:3000/books/book/4` , we should got the info about the book which has the `id=4`
1. In [books.js](./routes/books.js) route, create another get listener `router.get("/book/:bookId", bookHandler)`. remember in get request `/someRoute/:any` then we can read anything comes after `/someRout/bla` as `req.params.any`, in this case we can read it as `req.params.bookId`
2. Create this method `bookHandler` in [bookscontroller.js](./controllers/bookscontroller.js) file and export it.
3. In `bookHandler` method, think about looking up for the book in books data, which has the same `req.params.bookId`
4. If the book exist, then render `mainTemplate`, and send the founded book to the template, for content,  use `content: "book"` the file you will create it later.
5. If the book not exist, render 404 error page.
6. create a new view file name it `book.ejs` in [content](./views/content/) Folder and put inside it the folowing HTML 
```html
<h1 class="text-center">BOOK TITLE</h1>
<section>
    <div class="row">
        <div class="col-md-12">
            <p>BOOK DESCRIPTION</p>
            <a href="#" class="btn btn-success">BOOK AUTHOR</a>
            <hr>
            <a href="/books" class="btn btn-primary">Go to All Books</a>
        </div>
    </div>
</section>
```
7. Test the dyanmic url: `localhost:3000/books/book/1`, `localhost:3000/books/book/5`, `localhost:3000/books/book/10000`.
8. If everything goes alright, then we can make a change in [books.ejs](./views/content/books.ejs) file, in the button `Read More`, to make the `href` attribute like `/books/book/BOOK_ID`.
9. Test: 
    - go to books route `localhost:3000/books` you should see all books
    - click on `Read More` button for one book, you should be redirect to this specific book page.

<hr>

## Add Book Route
1. create addbook (ejs) file. see bootetrap 5 -> forms
   - form for information :
     - book title textbox.
     - book prise textbox.
     - book pages textbox.
     - author: select.
     - book description texterea.
2. create two route addbook (get/post).
3. for get method, render addbook, send also all authors as an object.
4. for post: Store the new book to books.json file, increnet the id.
5. if success: redirect to allbooks page.
6. if error: show that error.