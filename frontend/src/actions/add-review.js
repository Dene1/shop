import { ACTION_TYPE } from "./action-type.js"

export const addReview = (review) => ({
    type: ACTION_TYPE.ADD_REVIEW,
    payload: review,
})
