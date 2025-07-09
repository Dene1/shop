import { transformProduct } from "../transformers/index.js"
import { request } from "../../utils/request.js"

export const getProducts = (searchPhrase, page, limit) =>
    request(
        `/products?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
    )
        .then((loadedProducts) =>
            Promise.all([
                loadedProducts.json(),
                loadedProducts.headers.get("Link"),
            ]),
        )
        .then(([loadedProducts, links]) => ({
            products: loadedProducts && loadedProducts.map(transformProduct),
            links,
        }))
