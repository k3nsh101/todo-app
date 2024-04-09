const categories = require('../models/categoryModel');

exports.category_list = async function(req, res) {
    const allCategories = await categories.find({}, "title description").exec();
    res.send(allCategories);
};

exports.category_item = async function(req, res) {
    const category = await categories.find({'_id': req.params.categoryid}, "_id title description").exec();
    res.send(category);
};

exports.new_category = async function(req, res) {
    const category = new categories({
        'title': req.body.title, 'description': req.body.description
    });

    await category.save();
    res.send(category);
}

exports.update_category = async function(req, res) {
    const id = req.params.categoryid;
    const category = await categories.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
    }, { new: true} );

    res.send(category);
}

exports.delete_category = async function(req, res) {
    const id = req.params.categoryid;
    const category = await categories.findByIdAndDelete(id);

    res.sendStatus(200);
}