const tasks = require('../models/tasksModel');
const categories = require('../models/categoryModel');

// Get all tasks
exports.tasks_list = async function(req, res) {
    const allTasks = await tasks.find({}, 
        "title dueDate priority")
        .exec();

    res.render('tasks', { tasks_list: allTasks});
};

exports.get_task = async function(req, res) {
    const task = await tasks.findById(req.params.taskid);
    res.send(task);
}

// Create a new task: form page
exports.task_create_get = async function(req, res) {
    res.render('task_form')
};

// Create a new task: POST request
exports.task_create_post = async function(req, res) {
    // First check if there is a same category
    let categoryID = await categories.findOne({'title': req.body.category}, "_id")

    // If not create a category
    if (!categoryID){
        const category = new categories({
            'title': req.body.category,
        });
        
        categoryID = category._id;
        await category.save();
    }

    const task = new tasks({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
        categoryID,
    }); 

    await task.save();
    res.redirect('/tasks')
};

exports.task_update = async function(req, res) {
    const id = req.params.taskid;
    const categoryID = await categories.findOne({'title': req.body.category}, "_id")
    try {
        const task = await tasks.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            status: req.body.status,
            categoryid: categoryID,
            updatedAt: new Date() 
        }, { new:true });

        if (!task) {
            res.sendStatus(404);
        }
        else {
            res.status(200)
            res.send(task)
        }
    } catch (e) {
        res.sendStatus(400);
    }
};

exports.task_delete = async function(req, res) {
    const id = req.params.taskid;
    try {
        const task = await tasks.findByIdAndDelete(id);
        if (!task) {
            res.sendStatus(404);
        }
        else {
            res.status(200)
            res.send(task)
        }
    } catch (e) {
        res.sendStatus(400);
    }
}