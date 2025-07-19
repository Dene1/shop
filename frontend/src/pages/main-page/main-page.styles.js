import styled from "styled-components"

const MainPageContainer = styled.div`
    padding: 0 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;

    .buttons-container {
        display: flex;
        justify-content: space-evenly;
    }

    .image-container {
        width: 50%;
    }
`

const Title = styled.div`
    text-transform: uppercase;
    letter-spacing: 6px;
    text-shadow: -0.575rem 0.375rem 0.1rem #9f9f9f;
    position: relative;
    font:
        900 200px "Bebas Neue",
        sans-serif;

    span {
        font-weight: 400;
    }
`

const SocialIcons = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid #2c3333;
    align-items: center;
    z-index: 25;
`

const StyledIconLink = styled.a`
    text-decoration: none;
    color: #2c3333;
    padding: 18px;
    border: 1px solid #2c3333;

    &:hover {
        cursor: pointer;
        box-shadow: inset rgba(64, 80, 96, 0.5) 0 0 10px;
    }
`

const StyledJust = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    padding-top: 10px;

    p {
        margin: 0;
        color: #ea454c;
        opacity: 0.4;
        letter-spacing: 70px;
        font:
            400 21rem "Bebas Neue",
            sans-serif;
    }
`

const StyledImage = styled.img`
    position: relative;
    top: 80px;
    right: 14%;
    width: 150%;
    max-width: 1000px;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 120px 0 0 10px;
    width: 50%;
`

const PositionedImage = styled.img`
    position: absolute;
    width: 50px;
    height: auto;
`

const TopImage = styled(PositionedImage)`
    top: 12%;
    left: 70%;
    width: 6rem;
`
const MiddleCross = styled(PositionedImage)`
    top: 60%;
    left: 84%;
    transform: translate(-50%, -50%);
    width: 4rem;
`

const RightCross = styled(PositionedImage)`
    top: 74%;
    right: 8%;
    width: 6rem;
`

const FooterCross = styled(PositionedImage)`
    bottom: -40px;
    left: -6%;
    rotate: -40deg;
`

export {
    MainPageContainer,
    Title,
    SocialIcons,
    StyledIconLink,
    StyledJust,
    StyledImage,
    InnerContainer,
    TopImage,
    MiddleCross,
    RightCross,
    FooterCross,
}
