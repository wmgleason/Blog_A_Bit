const router = require("express").Router();
const { User, Post, Comment } = require('../../models');

router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the e-mail address entered
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Either your email address or password is incorrect, please try again." });
      return;
    }

    // Verify the submitted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Either your email address or password is incorrect, please try again." });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: "Success – you are now logged in!" });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
          individualHooks: true,
          where: {
              id: req.params.id
          }
      })
      .then(dbUserData => {
          if (!dbUserData[0]) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', (req, res) => {
  User.destroy({
          where: {
              id: req.params.id
          }
      })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


module.exports = router;
