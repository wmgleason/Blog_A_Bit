const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// GET posts by the user currently logged in
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      order: [['created_at', 'DESC']],
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
          attributes: ['username', 'email']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('dashboard', {
          posts,
          username: req.session.username,
          email: req.session.email,
          user_id: req.session.user_id,
          loggedIn: true
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// GET selected post for edit-post page
router.get('/edit/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM post')]
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
        res.status(404).json({ message: 'Sorry, there is no post with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      // passes data to the template
      res.render('edit-post', {
        post,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;