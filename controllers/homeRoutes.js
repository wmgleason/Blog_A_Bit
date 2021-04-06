const router = require("express").Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

// Prevent non logged in users from viewing the homepage
router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'post',
      'title',
      'created_at',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    ]
  })
    .then(dbPostData => {
      // pass all post objects into the homepage template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // Added loggedIn data here, as homepage was not properly displaying conditional login/logout link
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

// login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*)')]
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Sorry, there is no post with that id.' });
        return;
      }
    });
  });

module.exports = router;
