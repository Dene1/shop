import { request } from "@/utils/request"
import { addReview } from "./add-review.js"

export const addReviewAsync = (productId, content) => (dispatch) => {
    request(`/products/${productId}/reviews`, "POST", { content }).then(
        (productData) => dispatch(addReview(productData.data)),
    )
}
