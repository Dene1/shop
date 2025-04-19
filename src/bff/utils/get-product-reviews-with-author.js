import {getReview, getUsers} from "../api/index.js"

export const getProductReviewsWithAuthor = async (productId) => {
    const reviews = await getReview(productId)
    const users = await getUsers()

    return reviews.map((review) => {
        const user = users.find(({id}) => id === review.authorId)

        return {
            ...review,
            author: user?.login
        }
    })
}
