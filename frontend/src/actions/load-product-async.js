import { setProductData } from "./set-product-data.js"
import { request } from "../utils/request.js"

export const loadProductAsync = (productId) => (dispatch) =>
    request(`/products/${productId}`).then((productData) => {
        if (productData.data) {
            dispatch(setProductData(productData.data))
        }
        return productData
    })
