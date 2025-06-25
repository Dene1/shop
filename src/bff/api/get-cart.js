import { transformCart } from "../transformers/index.js"

export const getCart = () =>
    fetch("http://localhost:3001/cart")
        .then((loadedCart) => loadedCart.json())
        .then((loadedCart) => loadedCart && loadedCart.map(transformCart))
