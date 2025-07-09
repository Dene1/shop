import { transformUser } from "../transformers/index.js"
import { request } from "../../utils/request.js"

export const getUsers = () =>
    request("/users")
        .then((loadedUsers) => loadedUsers.json())
        .then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser))
