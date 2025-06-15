import {ACTION_TYPE} from "../actions/index.js"

const initialPostsState = {
    products: [],
}

export const productsReducer = (state = initialPostsState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_PRODUCTS_DATA:
            return {
                ...state,
                products: action.payload,
            }
        default:
            return state
    }
}
