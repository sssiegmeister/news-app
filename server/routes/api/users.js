const User = require('../../models/user');
const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  localStrategy)
);

function localStrategy(email, password, callback) {
  User.findOne({ email: email })
    .then(function (user) {
      if (user && user !== null && bcrypt.compareSync(password, user.password)) {
        callback(null, user);
      } else {
        callback("Cannot find user", null);
      }
    }, function (error) {
      callback(error, null);
    });
}
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function serializeUser(user, callback) {
  callback(null, user);
}

function deserializeUser(user, callback) {
  User.findOne({ _id: user._id })
    .then(function (user) {
      callback(null, user);
    }, function (err) {
      console.log(err);
      callback(err, null);
    });
}

router.post('/login', (req, res) => {
  const userObject = User.findOne({ email: req.body.email }).then((result, err) => {
    if (err) {
      console.log("Error");
      console.log(err);
      res.status(500).send(err);
    } else {
      const userPassword = req.body.password;
      const dbPassword = result.password;

      if (bcrypt.compare(userPassword, dbPassword)) {
        res.json(result)
      } else {
        res.status(404).send({
          message: "Wrong password"
        });
      }
    }
  });
});

router.get('/loggedIn', (req, res) => {
  console.log('Route: /loggedIn');
  if (req.isAuthenticated()) {
    res.status(200).send(req.user);
  } else {
    console.log("user not logged in");
    res.status(404).send({ message: 'User is not logged in' });
  }
});

router.post('/register', (req, res) => {
  const user = new User();
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    user.firstName = req.body.first;
    user.lastName = req.body.last;
    user.email = req.body.email;
    user.password = hash;
    user.save().then(() => {
      res.json(user);
    }, (err) => {
      res.status(500).send(err);
    });
  });
});

router.put('/save', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    {
      $addToSet: { saved: [req.body.article] }
    },
    {
      new: true
    }).then((result, err) => {
    console.log(req.body.userId);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send(err);
    }
  })
});

module.exports = router;
