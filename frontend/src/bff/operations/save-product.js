import { ROLE } from "../constants/index.js"
import { sessions } from "../sessions.js"
import { addProduct, updateProduct } from "../api/index.js"

export const saveProduct = async (hash, newProductData) => {
    const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }
    console.log(newProductData)
    const savedProduct = newProductData.id === ""
        ? await addProduct(newProductData)
        : await updateProduct(newProductData)

    return {
        error: null,
        res: savedProduct,
    }
}
