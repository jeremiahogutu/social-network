const express = require('express');
const { createPost, getPosts } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator }  = require('../validator');
const router = express.Router();

router.get('/', requireSignin, getPosts);
router.post('/post', createPostValidator, createPost);

// any route containing :userId, our app will first execute userById() method
router.param("userId", userById);

module.exports = router;