const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

// Display become member form on GET
exports.become_member_get = asyncHandler(async (req, res, next) => {
    if (req.user) {
        res.render("become-member", {
            user: req.user,
        })
    } else {
        // Redirect to homepage if not logged in
        res.redirect("/")
    }
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
            await User.findOneAndUpdate(
                {"_id": req.user._id},
                {
                    "$set": {
                        "member": true,
                    }
                }
            )
            console.log("correct!");
            res.redirect("/");
        }
    })
];