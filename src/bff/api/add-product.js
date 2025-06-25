import { nanoid } from "nanoid"
import { transformProduct } from "../transformers/index.js"

export const generateId = () => {
    return nanoid()
}

const myId = generateId()
const productId = `${ myId }`

export const addProduct = ({
                               imageUrl,
                               size,
                               title,
                               price,
                               brand,
                               category,
                               gender,
                               description
                           }) =>

    fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            id: productId,
            title,
            price,
            category,
            gender,
            size,
            image_url: imageUrl,
            brand,
            description,
        }),
    }).then((createdProduct) => createdProduct.json())
        .then((createdProduct) => createdProduct && transformProduct(createdProduct))
