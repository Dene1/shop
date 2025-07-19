import styled from "styled-components"
import { Link } from "react-router-dom"

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    justify-items: center;
    align-items: center;
    gap: 20px;
    margin: 8px;
`

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: 100px;
    height: 30px;
    border: 1px solid #2c3333;

    &:hover {
        cursor: pointer;
        background-color: #dedede;
    }
`

const StyledIcon = styled(Link)`
    &:hover {
        cursor: pointer;
        transform: scale(1.3);
        transition: transform 0.8s ease;
    }
`

const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;

    &:hover {
        cursor: pointer;
        transform: scale(1.3);
        transition: transform 0.8s ease;
    }
`

const CursorPointer = styled.div`
    cursor: pointer;

    .sign-out {
        font-size: 18px;
        margin-top: 8px;
    }
`

const UserName = styled.div`
    font-size: 18px;
    font-weight: 500;
`

export {
    RightAligned,
    StyledLink,
    StyledIcon,
    StyledButton,
    CursorPointer,
    UserName,
}
