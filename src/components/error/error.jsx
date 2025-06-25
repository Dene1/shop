import styled from "styled-components"

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Error = ({ error }) =>
    error && (
        <Div>
            <h1>An error occurred</h1>
            <div>{ error }</div>
        </Div>
    )
