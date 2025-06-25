import { addToCart } from "./add-to-cart.js"

export const addCartAsync = (requestServer, cartId, userId, productId, size, count) => (dispatch) =>
    requestServer("addInCart", cartId, userId, productId, size, count)
        .then((productData) => dispatch(addToCart(productData.res)))
