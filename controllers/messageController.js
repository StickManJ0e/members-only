const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, check, validationResult } = require("express-validator");

// Display list of all messages 
exports.index = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find({}).sort({ timestamp: -1 }).populate("user").exec();

    res.render("index", {
        message_list: allMessages,
        user: req.user,
    });
})

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

// Display message delete form on GET
exports.message_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of message
    const [message] = await Promise.all([
        Message.findById(req.params.id).exec()
    ]);

    if (message === null) {
        // No results
        res.redirect("/");
    };

    res.render("message-delete", {
        message: message,
        user: req.user._id,
    });
});

// Handle message delete on POST
exports.message_delete_post = asyncHandler(async (req, res, next) => {
    // Get details of message
    const [message] = await Promise.all([
        Message.findById(req.params.id).exec()
    ]);

    console.log(req.user);
    console.log(req.params);

    await Message.findByIdAndDelete(req.body.messageid);
    res.redirect("/");
})