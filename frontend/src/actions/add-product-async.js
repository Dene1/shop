import { addProductData } from "./add-product-data.js"
import { request } from "../utils/request.js"

export const addProductAsync = (newProductData) => (dispatch) =>
    request("/products", "POST", newProductData).then((updatedProduct) => {
        dispatch(addProductData(updatedProduct.data))

        return updatedProduct.data
    })
