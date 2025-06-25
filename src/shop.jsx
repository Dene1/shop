import { Route, Routes } from "react-router-dom"
import { Footer, Header, ConfirmModal } from "./components/index.js"
import {
    AdminPanel,
    Authorization,
    Cart,
    Catalog,
    Favorites,
    MainPage,
    Product,
    Registration,
    Users
} from "./pages/index.js"
import { loadCartAsync, setProductsData, setUser } from "./actions/index.js"
import { useEffect, useLayoutEffect } from "react"
import { useDispatch } from "react-redux"
import { ERROR } from "./constants/index.js"
import { getCart } from "./bff/api/get-cart.js"
import { useServerRequest } from "./hooks/index.js"
import styled from "styled-components"
import { getProductsForCart } from "./bff/api/index.js"

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 1440px;
    min-height: 100%;
    margin: 0 auto;
    background-color: white;
`

const Content = styled.div`
    padding: 120px 0 60px 0;
`

export const Shop = () => {
    const dispatch = useDispatch()
    const requestServer = useServerRequest()

    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem("userData")

        if (!currentUserDataJSON) {
            return
        }

        const currentUserData = JSON.parse(currentUserDataJSON)

        dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }))
    }, [dispatch])

    useEffect(() => {
        const fetchCart = async () => {
            const data = await getCart();
            dispatch(loadCartAsync(requestServer, data));
        };

        const fetchProduct = async () => {
            const data = await getProductsForCart()
            dispatch(setProductsData(data))
        }

        fetchProduct();
        fetchCart();
    }, [dispatch, requestServer]);

    return (
        <AppColumn>
            <Header />
            <Content>
                <Routes>
                    <Route path="/"
                           element={ <MainPage /> }
                    />
                    <Route path="/login"
                           element={ <Authorization /> }
                    />
                    <Route path="/register"
                           element={ <Registration /> }
                    />
                    <Route path="/users"
                           element={ <Users /> }
                    />
                    <Route path="/catalog"
                           element={ <Catalog /> }
                    />
                    <Route path="/product/:id"
                           element={ <Product /> }
                    />
                    <Route path="/product/:id/edit"
                           element={ <Product /> }
                    />
                    <Route path="/cart"
                           element={ <Cart /> }
                    />
                    <Route path="/favorites"
                           element={ <Favorites /> }
                    />
                    <Route path="/admin"
                           element={ <AdminPanel /> }
                    />
                    <Route path="/order"
                           element={ <div>Оформление заказа</div> }
                    />
                    <Route path="*"
                           element={ ERROR.PAGE_NOT_EXIST }
                    />
                </Routes>
            </Content>
            <Footer />
            <ConfirmModal />
        </AppColumn>
    )
}
