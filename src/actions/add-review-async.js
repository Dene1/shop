import {setProductData} from "./set-product-data.js"

export const addReviewAsync = (requestServer, userId, productId, content) => (dispatch) => {
    requestServer("addProductComment", userId, productId, content).then((postData) => {
        dispatch(setProductData(postData.res))
    })
}
