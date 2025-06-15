import {ACTION_TYPE} from "./action-type.js"

export const setCartData = (cartData) => ({
    type: ACTION_TYPE.SET_CART_DATA,
    payload: cartData,
})
