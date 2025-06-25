import { removeProductData } from "./remove-product-data.js"

export const removeProductAsync = (requestServer, id) => (dispatch) => requestServer("removeProduct", id)
    .then(() => dispatch(removeProductData(id)))
