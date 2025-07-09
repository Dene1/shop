import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { thunk } from "redux-thunk"
import {
    appReducer,
    cartReducer,
    productReducer,
    productsReducer,
    userReducer,
    usersReducer
} from "../reducers/index.js"

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    users: usersReducer,
    product: productReducer,
    products: productsReducer,
    cart: cartReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
