import {setProductData} from "./set-product-data.js"

export const removeReviewAsync = (requestServer, productId, id) => (dispatch) => {
    requestServer("removeProductComment", productId, id).then((productData) => {
        dispatch(setProductData(productData.res))
    })
}
