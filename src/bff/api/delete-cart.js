export const deleteCart = (productId) =>
    fetch(`http://localhost:3001/cart/${productId}`, {
        method: "DELETE",
    })
