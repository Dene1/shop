const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true })

const Review = mongoose.model("Review", ReviewSchema)

module.exports = Review