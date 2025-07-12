const Cart = require("../models/Cart");
const Product = require("../models/Product")
const User = require("../models/User")

async function addCart(cartProduct) {
    return Cart.create(cartProduct)
}

async function getCart(userId) {
    const cart = await Cart.find({ user_id: userId })

    return cart
}

async function updateCart(id, cartProduct) {
    return Cart.findByIdAndUpdate(id, cartProduct, { returnDocument: "after" })
}

async function deleteCart(id) {
    await Cart.deleteOne({ _id: id })
}

module.exports = {
    addCart,
    getCart,
    updateCart,
    deleteCart
}