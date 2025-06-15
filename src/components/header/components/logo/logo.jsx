import styled from "styled-components"
import {Link} from "react-router-dom"

const LargeText = styled.div`
    font-size: 40px;
    font-weight: 500;
    line-height: 48px;
    color: transparent;
    -webkit-text-stroke: 1px #EA454C;
`

const SmallText = styled.div`
    font-size: 40px;
    text-transform: unset;
    font-weight: 500;
    user-select: none;
    color: transparent;
    -webkit-text-stroke: 1px #2C3333;

`

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    user-select: none;
    letter-spacing: -2px;
    align-items: center;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.8s ease;
    }

    &:hover ${LargeText} {
        color: #EA454C;
    }

    &:hover ${SmallText} {
        color: #2C3333;
    }
`

const LogoContainer = ({className}) => (
    <Link to="/"
          className={className}
    >
        <IconContainer>
            <LargeText>Denel</LargeText>
            <SmallText>Sneakers</SmallText>
        </IconContainer>
    </Link>
)

export const Logo = styled(LogoContainer)`
    display: flex;
    align-items: center;
`
