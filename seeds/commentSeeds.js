const { Comment } = require('../models');

const commentData = [{
        comment_text: "This is a short blog post.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "What amazing insight.",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "This post did not tell me the answer to everything.",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;