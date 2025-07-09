import { ACTION_TYPE } from "./action-type.js"

export const removeProductData = (productData) => ({
    type: ACTION_TYPE.REMOVE_PRODUCT,
    payload: productData,
})
