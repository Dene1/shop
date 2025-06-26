import { createRoot } from "react-dom/client"
import "./index.css"
import { Shop } from "./shop"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
            <Shop />
        </Provider>
    </BrowserRouter>,
)
