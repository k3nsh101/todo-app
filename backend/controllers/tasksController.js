const tasks = require('../models/tasksModel');
const categories = require('../models/categoryModel');

exports.getPendingTasks = async function(req, res) {
    const userID = req.session.passport.user;
    const allTasks = await tasks.find(
        { userID, status: "Pending" }, 
        "title dueDate priority")
        .exec();

    res.send(allTasks);
};

// exports.getTasks = async function(req, res) {
//     const userID = req.session.passport.user;
//     const allTasks = await tasks.find({ userID }, 
//         "title dueDate priority")
//         .exec();

//     res.send(allTasks);
// };

exports.get_task = async function(req, res) {
    const userID = req.session.passport.user;

    const task = await tasks.find(
        {userID, _id: req.params.taskId}).
        populate({
            path: "categoryID",
            select: "title description"
        });

    res.send(task);
}

// Create a new task: POST request
exports.create_task = async function(req, res) {
    // First check if there is a same category
    const userID = req.session.passport.user;
    let categoryID = undefined;
    if (req.body.category){
        categoryID = await categories.findOne({'title': req.body.category}, "_id");
    }

    // if the request give "" values change those to undefined
    const description = req.body.description || undefined;
    const dueDate = req.body.dueDate || undefined;
    const priority = req.body.priority || undefined;

    const task = new tasks({
        userID,
        title: req.body.title,
        description,
        dueDate,
        priority,
        categoryID,
    }); 

    await task.save();
    res.sendStatus(201);
};

exports.task_update = async function(req, res) {
    const userID = req.session.passport.user;
    const taskId = req.params.taskId;
    const categoryID = await categories.findOne({'title': req.body.category}, "_id").exec();

    try {
        const task = await tasks.findOneAndUpdate(
            {userID, _id: taskId},
            {$set: {
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
                priority: req.body.priority,
                status: req.body.status,
                categoryID: categoryID,
                updatedAt: new Date() 
            }
        });

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
    const userID = req.session.passport.user;
    const taskId = req.params.taskId;

    try {
        const task = await tasks.find({userID, _id: taskId}).deleteOne({_id: taskId});
        if (!task) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(200);
        }
    } catch (e) {
        res.sendStatus(400);
    }
}