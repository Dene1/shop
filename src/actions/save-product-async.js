import {setProductData} from "./set-product-data.js"

export const saveProductAsync = (requestServer, newProductData) => (dispatch) =>
    requestServer("saveProduct", newProductData)
        .then((updatedProduct) => {
            dispatch(setProductData(updatedProduct.res))

            return updatedProduct.res
        })
