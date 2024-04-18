const tasks = require('../models/tasksModel');
const categories = require('../models/categoryModel');

// Get all tasks
exports.tasks_list = async function(req, res) {
    const allTasks = await tasks.find({}, 
        "title dueDate priority")
        .exec();

    res.send(allTasks);
};

exports.get_task = async function(req, res) {
    const task = await tasks.findById(req.params.taskid).populate({
        path: "categoryID",
        select: "title description"
    });
    res.send(task);
}

// Create a new task: POST request
exports.create_task = async function(req, res) {
    // First check if there is a same category
    let categoryID = undefined;
    if (req.body.category){
        categoryID = await categories.findOne({'title': req.body.category}, "_id");
    }

    // if the request give "" values change those to undefined
    const description = req.body.description || undefined;
    const dueDate = req.body.dueDate || undefined;
    const priority = req.body.priority || undefined;

    const task = new tasks({
        title: req.body.title,
        description,
        dueDate,
        priority,
        // status: req.body.status,
        categoryID,
    }); 

    await task.save();
    res.sendStatus(201);
};

exports.task_update = async function(req, res) {
    const id = req.params.taskid;
    let categoryID = undefined;
    if (req.body.category){
        categoryID = await categories.findOne({'title': req.body.category}, "_id").exec();
    }

    try {
        const task = await tasks.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            status: req.body.status,
            categoryID: categoryID,
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
        console.log(e)
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