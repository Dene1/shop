import { ACTION_TYPE } from "./action-type.js";

export const removeFromCart = (productId) => {
    return {
        type: ACTION_TYPE.REMOVE_FROM_CART,
        payload: productId,
    };
};
