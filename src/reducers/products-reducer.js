import { ACTION_TYPE } from "../actions/index.js"

const initialPostsState = {
    products: [],
}

export const productsReducer = (state = initialPostsState, action) => {
    console.log(action)
    switch (action.type) {
        case ACTION_TYPE.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            }
        case ACTION_TYPE.SET_PRODUCTS_DATA:
            return {
                ...state,
                products: action.payload,
            }
        case ACTION_TYPE.REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.payload
                ),
            }
        default:
            return state
    }
}
