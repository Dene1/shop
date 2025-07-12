module.exports = function (carts) {
    return carts.map(cart => ({
        id: cart._id,
        user_id: cart.user_id,
        product_id: cart.product_id,
        size: cart.size,
        count: cart.count,
    }));
}