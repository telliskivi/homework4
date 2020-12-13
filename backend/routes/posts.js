const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const PostModel = require('../models/PostModel');
const { post } = require('./users');


router.get('/', authorize, (request, response) => {

    // Endpoint to get posts of people that currently logged in user follows or their own posts

    PostModel.getAllForUser(request.currentUser.id, (postIds) => {

        if (postIds.length) {
            PostModel.getByIds(postIds, request.currentUser.id, (posts) => {
                response.status(201).json(posts)
            });
            return;
        }
        response.json([])

    })

});

router.post('/', authorize, (request, response) => {
    // Endpoint to create a new post
    let user = request.currentUser.id;
    let post = request.body;
    if (post == null) {
        response.status(400).json();
    } else {
        request.body.userId = user;

        PostModel.create(post, () => {
            response.status(201).json(post);
        });
    }
});



router.put('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to like a post
});

router.delete('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to unlike a post

});

module.exports = router;
