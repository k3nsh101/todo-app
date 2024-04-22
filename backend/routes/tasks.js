const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

// Retrieve tasks by the user
router.get('/', tasksController.getPendingTasks);

// Create new task
router.post('/', tasksController.create_task);

// Retrieve the specific task
router.get('/:taskId', tasksController.get_task);

// Update the specific task
router.put('/:taskId', tasksController.task_update);

// Delete the specific task
router.delete('/:taskId', tasksController.task_delete);

module.exports = router;