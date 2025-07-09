import { sessions } from "../sessions.js"

export const logout = async (userSession) => {
    sessionStorage.removeItem("userData");
    sessions.remove(userSession)
}
