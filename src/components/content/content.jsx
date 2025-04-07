import styled from "styled-components"
import {H2} from "../h2/h2.js"

const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: calc(100vh - 400px);
`
export const Content = ({children, error}) =>
    error ? (
        <Div>
            <H2>Произошла ошибка</H2>
            <div>{error}</div>
        </Div>
    ) : (
        <Div>{children}</Div>
    )
