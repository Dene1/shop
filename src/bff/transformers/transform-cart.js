export const transformCart = (dbCart) => ({
    id: dbCart.id,
    userId: dbCart.user_id,
    count: dbCart.count
})
