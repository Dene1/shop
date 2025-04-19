export const deleteProduct = (productId) =>
    fetch(`http://localhost:3001/products/${productId}`, {
        method: "DELETE",
    })
