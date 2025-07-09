import { BASE_URL } from "../constants"

export function request(url, method, data) {
    return fetch(`${BASE_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: method || "GET",
        body: data ? JSON.stringify(data) : undefined,
        credentials: "include",
    }).then((res) => res.json())
}
