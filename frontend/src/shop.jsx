import { ConfirmModal, Footer, Header } from "@/components"
import { setProductsData, setUser } from "@/actions"
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
} from "@/pages"
import { ERROR } from "./constants"
import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect, useLayoutEffect } from "react"
import { request } from "@/utils/request"

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
    padding: ${(props) => (props.$isMainPage ? "0" : "120px 0 60px 0")}
} `

export const Shop = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const isMainPage = location.pathname === "/"

    useEffect(() => {
        request("/products/all").then(({ data: res }) => {
            dispatch(setProductsData(res))
        })
    }, [dispatch])

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
            <Content $isMainPage={isMainPage}>
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
                    <Route path="/order" element={<div>Order</div>} />
                    <Route path="*" element={ERROR.PAGE_NOT_EXIST} />
                </Routes>
            </Content>
            <Footer />
            <ConfirmModal />
        </AppColumn>
    )
}
