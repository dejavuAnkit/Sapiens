const express = require('express')
const router = express.Router();

const controller = require('../controllers/posts');

router.put('/', controller.putController);
router.post('/', controller.postController); 
router.get('/', controller.getPostsController);
router.get('/byemail', controller.getPostByemail);
module.exports = router;