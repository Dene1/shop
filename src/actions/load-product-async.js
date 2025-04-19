import {setProductData} from "./set-product-data.js"

export const loadProductAsync = (requestServer, productId) => (dispatch) =>
    requestServer("fetchProduct", productId).then((postData) => {
        if (postData.res) {
            dispatch(setProductData(postData.res))
        }
        return postData
    })
