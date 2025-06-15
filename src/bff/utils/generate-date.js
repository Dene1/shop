import {format} from "date-fns";

export const generateDate = () => {
    const date = new Date(Math.random() * 1000000000000 + 1999999999999)
        .toISOString()
        .substring(0, 11)
        .replace("T", " ")
    return format(date, "dd-MM-yyyy")
}
