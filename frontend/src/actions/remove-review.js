import { ACTION_TYPE } from "./action-type.js"

export const removeReview = (removeId) => ({
    type: ACTION_TYPE.REMOVE_REVIEW,
    payload: removeId,
})
