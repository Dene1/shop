import { ACTION_TYPE } from "./action-type.js"

export const addProductData = (productData) => ({
    type: ACTION_TYPE.ADD_PRODUCT,
    payload: productData,
})
