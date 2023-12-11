const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    body: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
})