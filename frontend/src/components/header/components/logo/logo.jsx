import {
    IconContainer,
    LargeText,
    LogoContainer,
    SmallText,
} from "@/components/header/components/logo/logo.styles"

export const Logo = () => (
    <LogoContainer to="/">
        <IconContainer>
            <LargeText>Denel</LargeText>
            <SmallText>Sneakers</SmallText>
        </IconContainer>
    </LogoContainer>
)
