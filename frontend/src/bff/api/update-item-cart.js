export const updateItemCart = ({
                                   id,
                                   user_id,
                                   product_id,
                                   size,
                                   count
                               }) =>
    fetch(`http://localhost:3001/cart/${ id }`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            id,
            user_id,
            product_id,
            size,
            count
        }),
    }).then((loadedPost) => loadedPost.json())
