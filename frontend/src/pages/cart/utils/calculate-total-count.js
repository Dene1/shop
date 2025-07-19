export const calculateTotal = (cartForUser, products) => {
    let total = 0

    for (let i = 0; i < cartForUser.length; i++) {
        const cartItem = cartForUser[i]
        const product = products.find((p) => p.id === cartItem.product_id)
        if (product) {
            total += Number(cartItem.count)
        }
    }

    return total
}
