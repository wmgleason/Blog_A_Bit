const { Post } = require('../models');

const postData = [
  {
    title: 'Post 1',
    post: `This is the first post. Fascinating.`,
    user_id: 1
  },
  {
    title: 'Whatever Post 2',
    post: `So very different from the first post, but still fasinating.`,
    user_id: 3
  },
  {
    title: 'Lost at Sea, Post 3',
    post: `These posts just keep on coming.`,
    user_id: 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;