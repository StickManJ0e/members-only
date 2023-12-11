const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const passport = require('passport');
const { body, validationResult } = require("express-validator");

// Display sign up form on GET
exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render("sign-up");
})

// Handle sign up for User on POST
exports.sign_up_post = [
    // Validate and sanitize fields.
    body("full_name", "Full name must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("username", "Email must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("password", "Password must not be emoty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    // Process request after validation and sanitization.

    asyncHandler(asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a User object with escaped and trimmed data.
        const user = new User({
            full_name: req.body.full_name,
            username: req.body.username,
            password: req.body.password,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with santized values/error messages.
            res.render("sign-up");
        } else {
            // Data from form is valid. Save user.
            await user.save();
            res.redirect("/");
        }
    }))
]

// Display sign in form on GET
exports.sign_in_get = asyncHandler(async (req, res, next) => {
    res.render("sign-in");
})

// Handle sign in for User on POST
exports.sign_in_post = passport.authenticate("local", {
    successRedirect:"/",
    failureRedirect:"/sign-in",
    failureMessage: true,
});

// Log out User on GET
exports.log_out = asyncHandler(asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}));

