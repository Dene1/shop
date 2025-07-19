import { useNavigate } from "react-router-dom"
import { FaGithub, FaInstagram, FaTelegramPlane } from "react-icons/fa"
import { Button } from "@/components"
import {
    FooterCross,
    InnerContainer,
    MainPageContainer,
    MiddleCross,
    RightCross,
    SocialIcons,
    StyledIconLink,
    StyledImage,
    StyledJust,
    Title,
    TopImage,
} from "@/pages/main-page/main-page.styles"

const RightShoeImage = "/airmax-main.png"
const cross1 = "/x-main/1.png"
const cross2 = "/x-main/2.png"
const cross3 = "/x-main/2.png"

export const MainPage = () => {
    const navigate = useNavigate()
    const handleClick = () => navigate("/catalog")

    return (
        <MainPageContainer>
            <InnerContainer>
                <Title>
                    <TopImage src={cross1} alt="" />
                    <div>Your</div>
                    <div>Dream</div>
                    <div>Shoes</div>
                    <MiddleCross src={cross2} alt="" />

                    <span> are here</span>
                    <FooterCross src={cross3} alt="" />
                </Title>
                <div className="buttons-container">
                    <Button
                        width="300px"
                        height="84"
                        fontSize="24px"
                        onClick={handleClick}
                    >
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
                    <p>just</p>
                    <p>do</p>
                    <p>it</p>
                </StyledJust>
                <StyledImage src={RightShoeImage} alt="Nike Shoe" />
                <RightCross src={cross1} alt="shoe image" />
            </div>
        </MainPageContainer>
    )
}
