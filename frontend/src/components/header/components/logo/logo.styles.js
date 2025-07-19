import styled from "styled-components"
import { Link } from "react-router-dom"

const LogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    font-family: "Bebas Neue", sans-serif;
`

const LargeText = styled.div`
    font-size: 48px;
    font-weight: 500;
    line-height: 48px;
    color: transparent;
    -webkit-text-stroke: 1px #ea454c;
`

const SmallText = styled.div`
    font-size: 48px;
    text-transform: unset;
    font-weight: 500;
    user-select: none;
    color: transparent;
    -webkit-text-stroke: 1px #2c3333;
`

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    user-select: none;
    letter-spacing: -1px;
    align-items: center;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.8s ease;
    }

    &:hover ${LargeText} {
        color: #ea454c;
    }

    &:hover ${SmallText} {
        color: #2c3333;
    }
`
export { LogoContainer, LargeText, SmallText, IconContainer }
