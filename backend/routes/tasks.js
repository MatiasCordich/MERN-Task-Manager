const express = require('express')
const { createTaskCtrl, getAllTasksCtrl, updateTaskCtrl, deleteTaskCtrl } = require('../controllers/task')

const router = express.Router()

router.post('/', createTaskCtrl)
router.get('/all', getAllTasksCtrl)
router.get('/myTasks', getAllTasksCtrl)
router.put('/:taskId', updateTaskCtrl)
router.delete('/:taskId', deleteTaskCtrl)

module.exports = router