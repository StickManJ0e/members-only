const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, check, validationResult } = require("express-validator");

// Display create message form on GET
exports.create_message_get = asyncHandler(async (req, res, next) => {
    if (req.user) {
        res.render("create-message", {
            user: req.user
        })
    } else {
        // Redirect to homepage if not logged in
        res.redirect("/");
    }
});

// Handle create message for User on POST
exports.create_message_post = [
    body("title", "No title provided.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("message", "No message provided.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    // Process request after validation and sanitization

    asyncHandler(async (req, res, next) => {
        // Extrac the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            console.log(errors.array());
            res.render("create-message", {
                errors: errors.array(),
                user: req.user,
            });
        } else {
            const message = new Message({
                title: req.body.title,
                body: req.body.message,
                user: req.user._id,
            });
            await message.save();
            res.redirect('/');
            
        }
    })
]