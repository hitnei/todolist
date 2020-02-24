const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/category_controller.js');

router.post('/getAllCategory', category_controller.getAllCategory);
router.post('/createCategory', category_controller.createCategory);
router.post('/editCategory', category_controller.editCategory);
router.post('/deleteCategory', category_controller.deleteCategory);


module.exports = router;