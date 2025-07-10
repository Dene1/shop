const Cart = require("../models/Cart");
const Review = require("../models/Review")
const Product = require("../models/Product")

async function addCart(cartProduct) {
    return Cart.create(cartProduct)
}

async function getCart() {
    const products = await Product.find()

    return products
}

async function deleteCart(id) {
    await Review.deleteOne({ _id: id })
}


module.exports = {
    getCart,
    deleteCart
}