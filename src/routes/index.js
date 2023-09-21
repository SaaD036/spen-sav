const express = require('express');

const userRouter = require('./user');
const commentRouter = require('./comment');
const entryRouter = require('./entry');

const router = express.Router();

router.use('/user', userRouter);
router.use('/comment', commentRouter)
router.use('/entry', entryRouter);

module.exports = router;
