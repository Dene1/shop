export const transformCart = (dbCart) => ({
    id: dbCart.id,
    userId: dbCart.user_id,
    productId: dbCart.product_id,
    size: dbCart.size,
    count: dbCart.count
})
