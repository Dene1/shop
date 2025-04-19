import styled from "styled-components"
import {Route, Routes} from "react-router-dom"
import {Footer, Header} from "./components/index.js"
import {Authorization, MainPage, Registration, Users} from "./pages/index.js"
import {Catalog} from "./pages/catalog/catalog.jsx"
import {setUser} from "./actions/index.js"
import {useLayoutEffect} from "react"
import {useDispatch} from "react-redux"
import {ERROR} from "./constants/index.js"


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
    padding: 120px 0;
`

export const Shop = () => {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem("userData")

        if (!currentUserDataJSON) {
            return
        }

        const currentUserData = JSON.parse(currentUserDataJSON)

        dispatch(setUser({...currentUserData, roleId: Number(currentUserData.roleId)}))
    }, [dispatch])


    return (
        <AppColumn>
            <Header/>
            <Content>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/catalog" element={<Catalog/>}/>
                    <Route path="/products/:id" element={<div>Продукт</div>}/>
                    <Route path="/products/:id/edit" element={<div>Продукт</div>}/>
                    <Route path="/basket" element={<div>Корзина</div>}/>
                    <Route path="/favorite" element={<div>Избранное</div>}/>
                    <Route path="/order" element={<div>Оформление заказа</div>}/>
                    <Route path="*" element={ERROR.PAGE_NOT_EXIST}/>
                </Routes>
            </Content>
            <Footer/>
        </AppColumn>
    )
}
