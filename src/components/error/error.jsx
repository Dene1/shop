import styled from "styled-components"
import {H2} from "../h2/h2.js"

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Error = ({error}) =>
    error && (
        <Div>
            <H2>Произошла ошибка</H2>
            <div>{error}</div>
        </Div>
    )
