import { ConfirmModal, Footer, Header } from "@components/"
import { setUser } from "@actions"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import {
    AdminPanel,
    Authorization,
    Cart,
    Catalog,
    Favorites,
    MainPage,
    Product,
    Registration,
    Users,
} from "./pages"
import { ERROR } from "./constants"
import { Route, Routes } from "react-router-dom"
import { useLayoutEffect } from "react"

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

    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem("userData")

        if (!currentUserDataJSON) {
            return
        }

        const currentUserData = JSON.parse(currentUserDataJSON)

        dispatch(
            setUser({
                ...currentUserData,
                roleId: Number(currentUserData.roleId),
            }),
        )
    }, [dispatch])

    return (
        <AppColumn>
            <Header />
            <Content>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Authorization />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/product/:id/edit" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route
                        path="/order"
                        element={<div>Оформление заказа</div>}
                    />
                    <Route path="*" element={ERROR.PAGE_NOT_EXIST} />
                </Routes>
            </Content>
            <Footer />
            <ConfirmModal />
        </AppColumn>
    )
}
