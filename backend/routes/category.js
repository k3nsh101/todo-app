const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.category_list);

router.get('/:categoryid', categoryController.category_item);

router.post('/', categoryController.new_category);

router.delete('/:categoryid', categoryController.delete_category);

router.put('/:categoryid', categoryController.update_category);


module.exports = router;