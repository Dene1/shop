import {ACTION_TYPE} from "./action-type.js"
import {server} from "../bff/index.js"

export const logout = (session) => {

    server.logout(session)

    return {
        type: ACTION_TYPE.LOGOUT,
    }
}
