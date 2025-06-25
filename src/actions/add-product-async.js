import { addProductData } from "./add-product-data.js"

export const addProductAsync = (requestServer, newProductData) => (dispatch) =>
    requestServer("saveProduct", newProductData)
        .then((updatedProduct) => {
            console.log(updatedProduct)

            dispatch(addProductData(updatedProduct.res))

            return updatedProduct.res
        })
