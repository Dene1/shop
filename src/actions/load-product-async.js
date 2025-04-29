import {setProductData} from "./set-product-data.js"

export const loadProductAsync = (requestServer, productId) => (dispatch) =>
    requestServer("fetchProduct", productId).then((productData) => {
        if (productData.res) {
            dispatch(setProductData(productData.res))
        }
        return productData
    })
