import { transformProduct } from "../transformers"

export const getProductsForCart = () =>
    fetch(`http://localhost:3001/products`)
        .then((loadedProducts) => loadedProducts.json())
        .then((loadedProducts) => (loadedProducts && loadedProducts.map(transformProduct)))
