import { ACTION_TYPE } from "./action-type.js"

export const updateCartData = (cartData) => {
    return {
        type: ACTION_TYPE.UPDATE_QUANTITY,
        payload: cartData,
    };
};
