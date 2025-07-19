import styled from "styled-components"

export const UserRowContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;

    & select {
        padding: 0 5px;
        font-size: 16px;
    }

    & .save-role-button {
        width: 20px;
        height: 30px;
        margin: 6px 0 0 6px;
        align-items: center;
    }

    & .remove-user-button {
        margin: 3px 0 0 10px;
        cursor: pointer;
        align-items: center;
    }
`
