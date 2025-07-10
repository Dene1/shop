module.exports = function (cart) {
    return {
        id: cart.id,
        userId: cart.user_id,
        productId: cart.product_id,
        size: cart.size,
        count: cart.count,
    }
}