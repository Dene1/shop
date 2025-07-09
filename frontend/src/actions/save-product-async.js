import { request } from "@utils/request"
import { setProductData } from "./set-product-data.js"

export const saveProductAsync = (id, newProductData) => (dispatch) => {
    const saveRequest = id
        ? request(`/products/${id}`, "PATCH", newProductData)
        : request("/products", "POST", newProductData)

    return saveRequest.then((updatedPost) => {
        dispatch(setProductData(updatedPost.data))
        return updatedPost.data
    })
}
