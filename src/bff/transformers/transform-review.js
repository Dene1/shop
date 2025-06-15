export const transformReviews = (dbReview) => ({
    id: dbReview.id,
    productId: dbReview.product_id,
    authorId: dbReview.author_id,
    publishedAt: dbReview.published_at,
    content: dbReview.content,
})
