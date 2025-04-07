import styled from "styled-components"
import {Route, Routes} from "react-router-dom"
import {Footer, Header} from "./components/index.js"
import {Authorization, MainPage, Registration} from "./pages/index.js"


const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1440px;
    min-height: 100%;
    margin: 0 auto;
    background-color: white;
`

const Content = styled.div`
    padding: 120px 0;
`

export const Shop = () => {

    return (
        <AppColumn>
            <Header/>
            <Content>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/users" element={<div>Пользователи</div>}/>
                    <Route path="/catalog" element={<div>Каталог</div>}/>
                    {/*<Route path="/product/:id" element={<div>Продукт</div>}/>*/}
                    <Route path="/basket" element={<div>Корзина</div>}/>
                    <Route path="/favorite" element={<div>Избранное</div>}/>
                    <Route path="/order" element={<div>Оформление заказа</div>}/>
                    <Route path="*" element={<div>Ошибка</div>}/>
                </Routes>
            </Content>
            <Footer/>
        </AppColumn>
    )
}
