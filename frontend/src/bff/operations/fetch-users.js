import { getUsers } from "../api/index.js"
import { sessions } from "../sessions.js"
import { ROLE } from "../constants/index.js"

export const fetchUsers = async (hash) => {
    const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    const users = await getUsers()

    return {
        error: null,
        res: users,
    }
}
