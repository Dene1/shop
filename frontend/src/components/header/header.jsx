import { ControlPanel, Logo } from "./components"
import { HeaderContainer } from "@/components/header/header.styles"

export const Header = () => (
    <HeaderContainer>
        <Logo />
        <ControlPanel />
    </HeaderContainer>
)
