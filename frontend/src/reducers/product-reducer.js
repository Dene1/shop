import { ACTION_TYPE } from "@actions"

const initialProductState = {
    id: "",
    title: "",
    price: "",
    category: "",
    gender: "",
    size: "",
    imageUrl: "",
    amount: "",
    brand: "",
    discription: "",
    reviews: [],
}

export const productReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_REVIEW: {
            return {
                ...state,
                reviews: [...state.reviews, action.payload],
            }
        }
        case ACTION_TYPE.REMOVE_REVIEW: {
            return {
                ...state,
                reviews: state.reviews.filter(
                    (review) => review.id !== action.payload,
                ),
            }
        }
        case ACTION_TYPE.SET_PRODUCT_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case ACTION_TYPE.RESET_PRODUCT_DATA: {
            return initialProductState
        }
        default:
            return state
    }
}
