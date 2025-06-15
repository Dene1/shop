export const addCart = (userId, productId, count) =>
    fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            id: productId,
            user_id: userId,
            count: count
        }),
    })
