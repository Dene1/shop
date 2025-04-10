import styled from "styled-components"
import {Link} from "react-router-dom"
import {FaTelegramPlane, FaGithub, FaInstagram} from "react-icons/fa";

const Title = styled.div`
    padding-top: 4rem;
    font-size: 9rem;
    text-transform: uppercase;
    font-weight: 600;
    line-height: 1.3;
    text-shadow: -0.375rem 0.375rem 0.125rem #9f9f9f;
    position: relative;

    & span {
        font-weight: lighter;
        letter-spacing: -12px;
    }
`

const StyledLink = styled(Link)`
    background-color: #2C3333;
    font-size: 20px;
    width: 17rem;
    height: 5.24rem;
    align-content: center;
    text-align: center;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 500;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: transform 0.8s ease;
    }
`

const Air = "/airmax-main.png"
const x1 = "/x-main/1.png"
const x2 = "/x-main/2.png"
const x3 = "/x-main/2.png"

const ImageContainer = styled.div`
    width: 50%;
`

const StyledJust = styled.div`
    font-size: 18.75rem; /* 300px */
    position: absolute;
    color: #EA454C;
    opacity: 0.2;
    text-transform: uppercase;
    font-weight: 200;
    line-height: 1.4;
    top: 3%;
    letter-spacing: -10px;
`

const StyledImage = styled.img`
    position: relative;
    right: 6%;
    width: 130%;
    max-width: 1000px;
    height: auto;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 50%;
`

const PositionedImage = styled.img`
    position: absolute;
    width: 50px;
    height: auto;
`

const LeftImage = styled(PositionedImage)`
    top: 10%;
    left: 70%;
    width: 6rem;
`

const MiddleImage = styled(PositionedImage)`
    top: 60%;
    left: 84%;
    width: 5rem;
    transform: translate(-50%, -50%);
`

const RightImage = styled(PositionedImage)`
    bottom: -40px;
    left: -5%;
    rotate: -40deg;
`

const SocialIcons = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid #2C3333;
    align-items: center;
`

const StyledContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 12px;
`

const StyledIconLink = styled.a`
    text-decoration: none;
    color: #2C3333;
    padding: 18px;
    border: 1px solid #2C3333;


`

const MainPageContainer = ({className}) => {
    return (
        <div className={className}>
            <InnerContainer>
                <Title>
                    <LeftImage src={x1} alt="x"/>
                    Your dream
                    <MiddleImage src={x2} alt="x"/>
                    shoes
                    <span> are here</span>
                    <RightImage src={x3} alt="x"/>
                </Title>
                <StyledContainer>
                    <StyledLink to="/catalog">view catalog</StyledLink>
                    <SocialIcons>
                        <StyledIconLink href="https://web.telegram.org/k/" target="_blank"
                                        rel="noopener noreferrer">
                            <FaTelegramPlane size={40}/>
                        </StyledIconLink>
                        <StyledIconLink href="https://www.instagram.com" target="_blank"
                                        rel="noopener noreferrer">
                            <FaInstagram size={40}/>
                        </StyledIconLink>
                        <StyledIconLink href="https://github.com/Dene1" target="_blank"
                                        rel="noopener noreferrer">
                            <FaGithub size={40}/>
                        </StyledIconLink>
                    </SocialIcons>
                </StyledContainer>
            </InnerContainer>

            <ImageContainer>
                <StyledJust>just <br/>do <br/>it</StyledJust>
                <StyledImage src={Air} alt="Sneackers"/>
            </ImageContainer>
        </div>
    )
}

export const MainPage = styled(MainPageContainer)`
    padding: 0 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
`
