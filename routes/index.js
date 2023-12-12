var express = require('express');
var router = express.Router();

// Require controller modules.
const auth_controller = require("../controllers/authController");

/* GET home page. */
router.get('/', function (req, res, next) {
  const test = ( ) => {
    console.log('test');
  }
    res.render('index', {
    user: req.user,
    test: test,
  });
});

/// AUTH Routes ///

// GET request for User sign up form.
router.get('/sign-up', auth_controller.sign_up_get);

// POST request for User sign up form
router.post('/sign-up', auth_controller.sign_up_post);

// GET request for User sign in form.
router.get('/sign-in', auth_controller.sign_in_get);

// POST request for User sign in form
router.post('/sign-in', auth_controller.sign_in_post);

// GET request for User log out
router.get('/log-out', auth_controller.log_out);

module.exports = router;
