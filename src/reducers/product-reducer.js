import {ACTION_TYPE} from "../actions"

const initialPostState = {
    id: "",
    title: "",
    price: "",
    category: "",
    gender: "",
    imageUrl: "",
    amount: "",
    brand: "",
    discription: "",
    reviews: [],
}

export const productReducer = (state = initialPostState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_PRODUCT_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case ACTION_TYPE.RESET_PRODUCT_DATA: {
            return initialPostState
        }
        default:
            return state
    }
}
