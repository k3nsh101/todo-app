const tasks = require('../models/tasksModel');

// Get all tasks
exports.tasks_list = async function(req, res) {
    const allTasks = await tasks.find({}, 
        "title dueDate priority")
        .exec();

    res.render('tasks', { tasks_list: allTasks});
};

// Get an individual task
exports.task_detail = async function(req, res) {
    res.send("NOT IMPLEMENTED: Tasks list")
};

// Create a new task: form page
exports.task_create_get = async function(req, res) {
    res.render('task_form')
};

// Create a new task: POST request
exports.task_create_post = async function(req, res) {
    const task = new tasks({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
        category: req.body.category,
    });

    await task.save();
    res.redirect('/tasks')
};


exports.task_update_get = async function(req, res) {
    res.send("NOT IMPLEMENTED: Tasks list")
};

exports.task_update_post = async function(req, res) {
    res.send("NOT IMPLEMENTED: Tasks list")
};

exports.task_delete_get = async function(req, res) {
    res.send("NOT IMPLEMENTED: Tasks list")
};

exports.task_delete_post = async function(req, res) {
    res.send("NOT IMPLEMENTED: Tasks list")
};