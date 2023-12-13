const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, check, validationResult } = require("express-validator");

exports.create_message_get = asyncHandler(async(req, res, next) => {
    if (req.user) {
        res.render("create-message", {
            user: req.user
        })
    } else {
        // Redirect to homepage if not logged in
        res.redirect("/");
    }
});

