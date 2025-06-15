import {ACTION_TYPE} from "./action-type";

export const clearCart = (cart) => {
    return {
        type: ACTION_TYPE.CLEAR_CART,
        payload: cart,
    };
};
