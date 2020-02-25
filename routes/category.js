const express = require('express');
const verifyToken = require('./../controllers/verifyToken')
const router = express.Router();

const category_controller = require('../controllers/category_controller.js');

router.post('/getAllCategory', verifyToken.verifyToken, category_controller.getAllCategoryByUser);
router.post('/createCategory', category_controller.createCategory);
router.post('/editCategory', category_controller.editCategory);
router.post('/deleteCategory', category_controller.deleteCategory);


module.exports = router;