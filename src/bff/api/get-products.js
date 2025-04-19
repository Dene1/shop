import {transformProduct} from "../transformers"

export const getProducts = (searchPhrase, page, limit) =>
    fetch(`http://localhost:3001/products?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`)
        .then((loadedProducts) =>
            Promise.all([loadedProducts.json(), loadedProducts.headers.get("Link")]))
        .then(([loadedProducts, links]) => ({
            products: loadedProducts && loadedProducts.map(transformProduct),
            links,
        }))
