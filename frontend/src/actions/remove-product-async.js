import { request } from "@utils/request"
import { removeProductData } from "./remove-product-data.js"

export const removeProductAsync = (id) => (dispatch) =>
    request(`/products/${id}`, "DELETE").then(() =>
        dispatch(removeProductData(id)),
    )
