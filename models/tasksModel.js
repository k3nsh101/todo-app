const mongoose = require('mongoose');
const { DateTime, Zone } = require('luxon');

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

tasksSchema.virtual('date_created_formatted').get(function() {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_MED);
});

tasksSchema.virtual('due_date_formatted').get(function() {
    if (this.dueDate){
        return DateTime.fromJSDate(this.dueDate).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    }
});

tasksSchema.virtual('date_updated_formatted').get(function() {
    if (this.updatedAt){
        return DateTime.fromJSDate(this.updatedAt).toLocaleString(DateTime.DATETIME_MED);
    }
});

tasksSchema.virtual('url').get(function() {
    return `/tasks/${this._id}`
})

module.exports = mongoose.model("Tasks", tasksSchema);