import styled from "styled-components"

const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: calc(100vh - 400px);
    margin: 20px 0;
`

export const Content = ({ children, error }) =>
    error ? (
        <Div>
            <h1>An error occurred</h1>
            <div>{ error }</div>
        </Div>
    ) : (
        <Div>{ children }</Div>
    )
