import { transformCart } from "../transformers/index.js"

export const addCart = (id, userId, productId, size, count) =>
    fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            id: id,
            user_id: userId,
            product_id: productId,
            size: size,
            count: count
        }),
    })
        .then((loadedProduct) => loadedProduct.json())
        .then((loadedProduct) => loadedProduct && transformCart(loadedProduct))
