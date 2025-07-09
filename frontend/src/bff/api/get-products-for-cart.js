import { transformProduct } from "../transformers/index.js"
import { request } from "../../utils/request.js"

export const getProductsForCart = () => {
    request("/products").then(
        (loadedProducts) =>
            loadedProducts.data.products &&
            loadedProducts.data.products.map(transformProduct),
    )
}
