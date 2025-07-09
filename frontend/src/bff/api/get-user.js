import { transformUser } from "../transformers/index.js"
import { request } from "../../utils/request.js"

export const getUser = async (loginToFind) =>
    request(`/users?login=${loginToFind}`)
        .then((loadedUser) => loadedUser.json())
        .then(([loadedUser]) => loadedUser && transformUser(loadedUser))
