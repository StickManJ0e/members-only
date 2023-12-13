const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, check, validationResult } = require("express-validator");

// Display become member form on GET
exports.become_member_get = asyncHandler(async (req, res, next) => {
    res.render("become-member", {
        user: req.user,
    })
})

// Handle become member form on POST
exports.become_member_post = [
    check("passcode")
        .trim()
        .equals("Members_Only_123")
        .withMessage("Incorrect passcode"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error message.
            res.render("become-member", {
                user: req.user,
                errors: errors.array(),
            })
        } else {
            console.log("correct!");
        }
    })
];