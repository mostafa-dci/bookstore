const express  = require('express')
const{mainHandler} = require('../controllers/mainController')
const {addAuthor, getRegisterPage, veifyEmail} = require('../controllers/authorsController')
const router = express.Router()


router.get('/', mainHandler)

router.get('/register', getRegisterPage)


// data from POST request (register form)
router.post('/register', addAuthor)

// verify Email request (GET)
router.get('/verify', veifyEmail)

module.exports = router