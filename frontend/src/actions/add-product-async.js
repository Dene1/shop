import { addProductData } from "./add-product-data.js"
import { request } from "../utils/request.js"

export const addProductAsync = (newProductData) => (dispatch) =>
    request("/products", "POST", newProductData).then((updatedProduct) => {
        console.log(updatedProduct, updatedProduct.data)

        dispatch(addProductData(updatedProduct.data))

        return updatedProduct.data
    })
