export const deleteReview = async (reviewId) =>
    fetch(`http://localhost:3001/reviews/${reviewId}`, {
        method: "DELETE",
    })
