const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    title: { type:String, required: true },
    description: String,
    dueDate: Date,
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
    },
    categoryID: Schema.Types.ObjectId,
    createdAt: { type: Date, default: new Date()},
    updatedAt: Date,
});

module.exports = mongoose.model("Tasks", tasksSchema);