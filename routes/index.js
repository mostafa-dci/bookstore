const express  = require('express')
const{mainHandler} = require('../controllers/mainController')
const router = express.Router()


router.get('/', mainHandler)





module.exports = router