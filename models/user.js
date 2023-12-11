const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: { type: String, required: true },
    username: {type: String, required: true},
    password: {type: String, required: true},
    member: {type: Boolean, default: false},
    admin: {type: Boolean, default: false},
});