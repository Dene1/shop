module.exports = function (review) {
    return {
        id: review._id,
        author: review.author.login,
        content: review.content,
        publishedAt: review.createdAt,
    }
}