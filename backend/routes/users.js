const express = require('express')
const { getUserInfoCtrl, updateUserInfoCtrl } = require('../controllers/user')

const router = express.Router()

router.get('/me', getUserInfoCtrl)
router.put('/me', updateUserInfoCtrl)

module.exports = router