import { transformProduct } from "../transformers/index.js"
import { request } from "../../utils/request.js"

export const getProduct = async (productId) =>
    request(`/products/${productId}`)
        .then((res) => {
            if (res.ok) {
                return res
            }
            console.log(productId)
            const error =
                res.status === 404
                    ? "Такая страница не существует"
                    : "Что-то пошло не так. Попробуйте позже"

            return Promise.reject(error)
        })
        .then((loadedProduct) => loadedProduct.json())
        .then(
            (loadedProduct) => loadedProduct && transformProduct(loadedProduct),
        )
