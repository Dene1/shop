export const updateProduct = ({
                                  id,
                                  imageUrl,
                                  title,
                                  price,
                                  category,
                                  gender,
                                  description
                              }) =>
    fetch(`http://localhost:3001/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            image_url: imageUrl,
            title,
            price,
            category,
            gender,
            description,

        }),
    }).then((loadedPost) => loadedPost.json())
