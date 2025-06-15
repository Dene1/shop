import {setCartData} from "./set-cart-data.js"

export const loadCartAsync = (requestServer, carts) => (dispatch) =>
    requestServer("fetchCart", carts)
        .then((carts) => {
            if (carts.res) {
                console.log(carts.res)
                dispatch(setCartData(carts.res))
            }
            return carts
        })
