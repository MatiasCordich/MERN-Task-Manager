const express = require('express')
const taskRoutes = require('./tasks')
const authRoutes = require('./auth')
const userRoutes = require('./users')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/tasks', taskRoutes)
router.use('/users', userRoutes)

module.exports = router