import { ACTION_TYPE } from "../actions/index.js"

const initialState = {
    cart: [],
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_TO_CART:
            return {
                cart: [...state.cart, action.payload]
            }
        case ACTION_TYPE.SET_CART_DATA:
            return {
                ...state,
                cart: action.payload,
            }
        case ACTION_TYPE.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(
                    (product) => product.id !== action.payload
                ),
            }
        case ACTION_TYPE.CLEAR_CART:
            return {
                ...state,
                cart: state.cart.filter(
                    (product) => product.id !== action.payload
                ),
            }
        case ACTION_TYPE.UPDATE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((product) => {
                    if (product.id === action.payload.id) {
                        return {
                            ...product,
                            count: action.payload.count,
                        }
                    }
                    return product
                }),
            }
        default:
            return state
    }
}
