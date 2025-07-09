import { transformCart } from "../transformers/index.js"
import { request } from "../../utils/request.js"

export const getCart = () =>
    request("/cart")
        .then((loadedCart) => loadedCart.json())
        .then((loadedCart) => loadedCart && loadedCart.map(transformCart))
