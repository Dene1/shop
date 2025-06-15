import {setProductData} from "./set-product-data.js"

export const addReviewAsync = (requestServer, userId, productId, content) => (dispatch) => {
    requestServer("addProductReview", userId, productId, content)
        .then((productData) => dispatch(setProductData(productData.res)))
}
