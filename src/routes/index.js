const express = require('express');

const userRouter = require('./user');
const commentRouter = require('./comment');

const router = express.Router();

router.use('/user', userRouter);
router.use('/comment', commentRouter)

module.exports = router;
