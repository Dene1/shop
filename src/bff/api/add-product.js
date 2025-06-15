import {generateDate} from "../utils/index.js"

export const addProduct = ({imageUrl, size, title, content}) =>
    fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            image_url: imageUrl,
            published_at: generateDate(),
            title,
            size: size,
            content,
        }),
    }).then((createdPost) => createdPost.json())
