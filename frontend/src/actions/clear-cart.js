import { ACTION_TYPE } from "./action-type.js";

export const clearCart = (cart) => {
    return {
        type: ACTION_TYPE.CLEAR_CART,
        payload: cart,
    };
};
