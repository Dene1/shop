export const getReviewsCount = (reviews = [], productId) => {
    const productReviews = reviews
        .filter(({ productId: reviewProductId }) => reviewProductId === productId)

    return productReviews.length
}
