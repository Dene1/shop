import { ROLE } from "../constants/index.js"
import { sessions } from "../sessions.js"
import { deleteUser } from "../api/index.js"

export const removeUser = async (hash, userId) => {
    const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    await deleteUser(userId)

    return {
        error: null,
        res: true,
    }
}
