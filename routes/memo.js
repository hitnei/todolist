const express = require('express');
const verifyToken = require('./../controllers/verifyToken')
const router = express.Router();

const memo_controller = require('../controllers/memo_controller.js');

router.post('/getAllMemo', verifyToken.verifyToken, memo_controller.getAllMemoByUser);
router.post('/createMemo', memo_controller.createMemo);
router.post('/editMemo', memo_controller.editMemo);
router.post('/deleteMemo', memo_controller.deleteMemo);
router.post('/changeMemoClip', verifyToken.verifyToken, memo_controller.changeMemoClipByIdMemo);


module.exports = router;