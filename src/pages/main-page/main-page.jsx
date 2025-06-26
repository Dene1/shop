import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { FaGithub, FaInstagram, FaTelegramPlane } from "react-icons/fa"
import { Button } from "@components"

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

const RightShoeImage = "/airmax-main.png"
const cross1 = "/x-main/1.png"
const cross2 = "/x-main/2.png"
const cross3 = "/x-main/2.png"

const StyledJust = styled.div`
    position: absolute;
    color: #ea454c;
    opacity: 0.3;
    text-transform: uppercase;
    letter-spacing: 60px;
    top: 3%;
    font:
        400 24rem "Bebas Neue",
        sans-serif;
`

const StyledImage = styled.img`
    position: relative;
    top: 40px;
    right: 16%;
    width: 150%;
    max-width: 1000px;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 0 0 10px;
    gap: 2rem;
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

const MainPageContainer = ({ className }) => {
    const navigate = useNavigate()
    const handleClick = () => navigate("/catalog")

    return (
        <div className={className}>
            <InnerContainer>
                <Title>
                    <TopImage src={cross1} alt="x" />
                    <div>Your</div>
                    <div>Dream</div>
                    <div>Shoes</div>
                    <MiddleCross src={cross2} alt="x" />

                    <span> are here</span>
                    <FooterCross src={cross3} alt="x" />
                </Title>
                <div className="buttons-container">
                    <Button
                        width="300px"
                        height="84px"
                        fontSize="24px"
                        onClick={handleClick}
                    >
                        {" "}
                        VIEW CATALOG
                    </Button>
                    <SocialIcons>
                        <StyledIconLink
                            href="https://web.telegram.org/k/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTelegramPlane size={40} />
                        </StyledIconLink>
                        <StyledIconLink
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram size={40} />
                        </StyledIconLink>
                        <StyledIconLink
                            href="https://github.com/Dene1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub size={40} />
                        </StyledIconLink>
                    </SocialIcons>
                </div>
            </InnerContainer>

            <div className="image-container">
                <StyledJust>
                    just <br />
                    do <br />
                    it
                </StyledJust>
                <StyledImage src={RightShoeImage} alt="Nike Shoe" />
                <RightCross src={cross1} alt="cross png" />
            </div>
        </div>
    )
}

export const MainPage = styled(MainPageContainer)`
    margin: 0 auto;
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
