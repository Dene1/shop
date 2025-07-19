import { removeReview } from "./remove-review.js"
import { request } from "@/utils/request"

export const removeReviewAsync = (productId, id) => (dispatch) => {
    request(`/products/${productId}/reviews/${id}`, "DELETE").then(() =>
        dispatch(removeReview(id)),
    )
}
