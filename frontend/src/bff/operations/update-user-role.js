import { setUserRole } from "../api/index.js"
import { ROLE } from "../constants/index.js"
import { sessions } from "../sessions.js"

export const updateUserRole = async (hash, userId, newUserRoleId) => {
    const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    await setUserRole(userId, newUserRoleId)

    return {
        error: null,
        res: true,
    }
}
