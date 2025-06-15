import styled from "styled-components"
import {useNavigate} from "react-router-dom"
import {FaTelegramPlane, FaGithub, FaInstagram} from "react-icons/fa";
import {Button} from "../../components/index.js"

const Title = styled.div`
    padding-top: 7rem;
    font-size: 9rem;
    text-transform: uppercase;
    font-weight: 600;
    line-height: 1.2;
    transform: scaleY(1.2);
    text-shadow: -0.375rem 0.375rem 0.125rem #9f9f9f;
    position: relative;

    & span {
        font-weight: lighter;
        letter-spacing: -12px;
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
    font-size: 18em;
    position: absolute;
    color: #EA454C;
    opacity: 0.3;
    text-transform: uppercase;
    font-weight: 200;
    line-height: 1.2;
    transform: scaleY(1.2);
    top: 11%;
`

const StyledImage = styled.img`
    position: relative;
    top: 40px;
    right: 10%;
    width: 140%;
    max-width: 1000px;
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

const TopImage = styled(PositionedImage)`
    top: 12%;
    left: 70%;
    width: 4rem;
`

const TopImage2 = styled(PositionedImage)`
    top: 70%;
    right: 10%;
    width: 6rem;
`

const MiddleImage = styled(PositionedImage)`
    top: 60%;
    left: 84%;
    transform: translate(-50%, -50%);
`

const RightImage = styled(PositionedImage)`
    bottom: -60px;
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
    margin-top: 100px;
`

const StyledIconLink = styled.a`
    text-decoration: none;
    color: #2C3333;
    padding: 18px;
    border: 1px solid #2C3333;

    &:hover {
        cursor: pointer;
        box-shadow: inset #EA454C 0 0 10px;
    }
`

const MainPageContainer = ({className}) => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/catalog")

    return (
        <div className={className}>
            <InnerContainer>
                <Title>
                    <TopImage src={x1}
                              alt="x"
                    />
                    Your dream
                    <MiddleImage src={x2}
                                 alt="x"
                    />
                    shoes
                    <span> are here</span>
                    <RightImage src={x3}
                                alt="x"
                    />
                </Title>
                <StyledContainer>
                    <Button width="300px"
                            height="84px"
                            fontSize="20px"
                            onClick={handleClick}
                    > VIEW CATALOG</Button>
                    <SocialIcons>
                        <StyledIconLink href="https://web.telegram.org/k/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                        >
                            <FaTelegramPlane size={40} />
                        </StyledIconLink>
                        <StyledIconLink href="https://www.instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                        >
                            <FaInstagram size={40} />
                        </StyledIconLink>
                        <StyledIconLink href="https://github.com/Dene1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                        >
                            <FaGithub size={40} />
                        </StyledIconLink>
                    </SocialIcons>
                </StyledContainer>
            </InnerContainer>

            <ImageContainer>
                <StyledJust>just <br />do <br />it</StyledJust>
                <StyledImage src={Air}
                             alt="Sneackers"
                />
                <TopImage2 src={x1}
                           alt="x"
                />
            </ImageContainer>
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
`
