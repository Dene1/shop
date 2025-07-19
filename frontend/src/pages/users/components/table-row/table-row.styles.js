import styled from "styled-components"

export const TableRowContainer = styled.div`
    display: flex;
    align-items: center;
    border: ${({ border }) => (border ? "1px solid black" : "none")};

    & > div {
        display: flex;
        padding: 0 10px;
    }

    & .login-column {
        width: 172px;
    }

    & .registered-at-column {
        width: 213px;
    }

    & .role-column {
        width: auto;
    }
`
