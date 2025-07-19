import { request } from "@/utils/request"
import { setProductData } from "./set-product-data.js"

export const saveProductAsync = (id, newProductData) => (dispatch) => {
    return request(`/products/${id}`, "PATCH", newProductData).then(
        (updatedPost) => {
            dispatch(setProductData(updatedPost.data))
            return updatedPost.data
        },
    )
}
