const express = require('express')
const { registerCtrl } = require('../controllers/auth')

const router = express.Router()

router.post('/register', registerCtrl )

module.exports = router