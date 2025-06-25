import { generateDate } from "../utils"

export const addReview = (userId, productId, content) =>
    fetch("http://localhost:3001/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            author_id: userId,
            product_id: productId,
            published_at: generateDate(),
            content,
        }),
    })
