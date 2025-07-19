import styled from "styled-components"

export const AuthorizationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .title {
        margin-top: 12px;
        font-size: 40px;
        text-transform: uppercase;
    }

    & .title-text {
        margin: 8px 0;
        text-align: center;
    }

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
        margin-top: 20px;
    }
`
