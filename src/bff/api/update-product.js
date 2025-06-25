import { transformProduct } from "../transformers/index.js"

export const updateProduct = ({
                                  id,
                                  imageUrl,
                                  title,
                                  price,
                                  category,
                                  size,
                                  gender,
                                  description
                              }) =>
    fetch(`http://localhost:3001/products/${ id }`, {
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
            size: size

        }),
    }).then((loadedProduct) => loadedProduct.json())
        .then((loadedProduct) => loadedProduct && transformProduct(loadedProduct))
