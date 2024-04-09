const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

// Retrieve all tasks
router.get('/', tasksController.tasks_list);

router.get('/create', tasksController.task_create_get);

// Create new task
router.post('/create', tasksController.task_create_post);

// Retrieve the specific task
router.get('/:taskid', tasksController.get_task);

// Update the specific task
router.put('/:taskid', tasksController.task_update);

// Delete the specific task
router.delete('/:taskid', tasksController.task_delete);

module.exports = router;