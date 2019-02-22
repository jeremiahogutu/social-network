const express = require('express');
const { getPosts, createPost, postByUser } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator }  = require('../validator');
const router = express.Router();

router.get('/', getPosts);
router.post(
    '/post/new/:userId',
    requireSignin,
    createPost,
    createPostValidator
);

router.get('/posts/:userId', requireSignin, postByUser );

// any route containing :userId, our app will first execute userById() method
router.param("userId", userById);

module.exports = router;