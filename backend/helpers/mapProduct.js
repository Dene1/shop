const mongoose = require("mongoose")
const mapReview = require("./mapReview")

module.exports = function (product) {
    return {
        id: product.id,
        title: product.title,
        imageUrl: product.image_url,
        price: product.price,
        category: product.category,
        gender: product.gender,
        size: product.size,
        brand: product.brand,
        description: product.description,
        reviews: product.reviews.map(review => mongoose.isObjectIdOrHexString(review) ? review : mapReview(review)),
        publishedAt: product.createdAt,
    }
}