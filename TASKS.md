# Tasks For Today

##  Register a new Author With Email Verification
> In Many websites, when we register, an email will be sent to us to veaify our email in the website. <br>
This email contains information about the website, name and url and team, services .... and so on, and it contains also a `link` when we click on, we will be redirect to that website to verify our email, this `link` contains parameters like userId, secret Key, the server will read this parameters and will detect if this information exist in database, if so the server will update our record to be as verified.

## Steps
### 1. Update [models](./models/)
1. In [Authors.js](./models/Authors.js) File Add another field to authors schema `verified`
    - type Boolean
    - default false
    - unique
2. Create a new model `Verifications.js` in [models](./models/):
    - Create a new Schema contains the followinng fields:
        - userId:
            - type: String.
            - unique.
            - required.
        - secretKey:
            - type: String.
            - unique.
            - required.
    - Create a model `mongoose.model` name it `verification` and export it.
3. Create a new Model `Email` in [models](./models/):
    - import on this file, nodemailer module and define the `transporter` object using process.env variables `(EMAIL_USER, EMAIL_PASSWORD)`.
    - create a function `send`, this function will take three arguments/parameters:
        * subject
        * emailTo
        * message

    and will return a new promise, to send the email.<br>
    *Hint: use `transporter.sendMail({...}).then(result).catch(error)`*
    - export the function `send`.
4. Create a new View File in [views/content](./views/content/) `register.js`
    - put inside it the follwing html content:
```html
<h1>Register a new Author</h1>
<div class="row">
    <div class="col-md-8">
        <form method="POST" action="/register">
            <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" name="name" placeholder="Full Name" required class="form-control" id="fullName" />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input required type="email" name="email" placeholder="Email" class="form-control" id="email" />
            </div>
            <div class="mb-3">
                <div class="form-group row align-items-center g-3">
                    <div class="col-6">
                        <label for="country" class="form-label">Country</label>
                        <input type="text" class="form-control" name="country" placeholder="Country" required
                            id="country" />
                    </div>
                    <div class="col-6">
                        <label for="city" class="form-label">City</label>
                        <input type="text" class="form-control" name="city" placeholder="City" required id="city" />
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label for="phone">Phone</label>
                <input type="tel" class="form-control" name="phone" id="phone" placeholder="Phone" />
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
</div>
```
5. Create a new file `authorsController.js` in [controllers](./controllers/) Folder.
    - *This controller file, will be responsible for any thing about authors **(add/delete/update)**.*
    - Create another Procedure `registerPage` this also accept two arguments `req, res`
        - this will render the `mainTemplate` with content `register`,  [views](./views/) Folder
        - export this method also with other exports.
    - create inside it `addAuthor` procedure:
        * will take `rea, res` arguments.
        * This wil create a new Author, to store it in `database`, you can use `Author.create({...}).then().catch()` from [Authors](./models/Authors.js) Model.
        * The values should come from `post request`, so you can read them using `req.body`.
        * In `then(insertedAuthor=>{...})` case:
            - you can use `insertedAuthor` as an argument to see inserted item, inserted id `_id` is important for next `(to store another record in verifications)`.
            - define a `random` string variable, to be stored in Verifications collection and to be sent also in the email. name it `secretKey`. *Hint:* try this method `Math.random().toString(36).slice(-8)` this will generate a random string 8 charactors contans from [A, Z] ^ [a, z] ^ [0, 9]
            - Insert a new record in `Verifications` collection using [Verifications](./models/Verifications.js) model. import this model and use it `Verfications.create({...}).then().catch()`:
                - userId is same author insertedId `insertedAuthor._id`
                - secretKey: the string variable `secretKey`
                - In `then()` case:
                    - use `send` function from [Email](./models/Email.js) to send the message to `req.body.email`, and the subject: `Book Store Verify Email`, message: 
                    ```html
                     Hello, The Email "<AUTHOR_EMAIL_HERE>" is used to register in Our Book Store. To verify Your account please click on <a href="<ORIGIN_DOMAIN/verify?uerId=USER_ID&secretKey=SECRETKEY>">This Link</a>
                     Thanks
                     BookStore Team.
                    ```
                    - *Hint*: you can use `req.get('origin')` to get the original domain like `http://localhost:3000/`
                    - in `then(result)` case: 
                        - Send success response to the user `res.json({...})`
                    - in `catch(error)` case:
                        - render Error page: `res.render('mainTemplaate', {title: 'ERROR', content: '404', error: error})`
                - in `catch(error)` case:
                    - render Error page: `res.render('mainTemplaate', {title: 'ERROR', content: '404', error: error})`
        * In `catch(error)` case: 
            - - render Error page: `res.render('mainTemplaate', {title: 'ERROR', content: '404', error: error})`
    - export this function
    - Create a new method `verifyEmail` takes two arguments `rea, res`:
        - this procedure will read the incoming link from email, `userId` **And** `secretKey`, And will check in `verfications` collection if exist:
        - if exist:
            - update `verified` for the author in  `authors` collection to make it `true`
            - delete the record from `verfications` collection
            - send suucess message if done or render error page if something where wrong
        - if not extist, render error page `page not found`.
6. In [index.js](./routes/index.js) file in routes, create the following route-listeners `router.get/post`:
    - First you have to import `registerPage, addAuthor, verifyEmail` from [authorsController](./controllers/)
    - `router.get('/register', registerPage)`
    - `router.post('/register', addAuthor)`
    - `router.get('/verify', verifyEmail)`
7. make a test:
    - try to insert a new user `localhost:3000/register`
    - check the email
    - check `database` in `authors` and `verifications` collections
    - click  on the link in resived email
    - check database again `verify` field in authors and ckeck if the record still exist in `verifications` collection.

### 3. Bonus:
In [register](./views/content/register) page, try to sending data using `fetch` or `jquery-ajax` **No Page Reloading**, and displat the response using [Bootstrap5 Modal Dialog](https://www.w3schools.com/bootstrap5/bootstrap_modal.php).
        
    
