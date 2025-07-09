const mongoose = require("mongoose")
const validator = require("validator")

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: "Неверная ссылка"
        }
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    gender: {
        type: String
    },
    price: {
        type: String
    },
    size: {
        type: Array,
        items: {
            type: [
                String,
            ]
        }
    },
    description: {
        type: String,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }]
}, { timestamps: true })

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product