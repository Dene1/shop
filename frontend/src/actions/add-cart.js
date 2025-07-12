import { ACTION_TYPE } from "./action-type.js"

export const addCart = (cartData) => ({
    type: ACTION_TYPE.ADD_CART,
    payload: cartData,
})
