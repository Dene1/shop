import { ACTION_TYPE } from "./action-type.js"
import { request } from "@/utils/request"

export const logout = () => {
    request("/logout", "POST")

    return {
        type: ACTION_TYPE.LOGOUT,
    }
}
