import styled from "styled-components"
import {ControlPanel, Logo} from "./components/index.js"

const HeaderContainer = ({className}) => (
    <header className={className}>
        <Logo/>
        <ControlPanel/>
    </header>
)

export const Header = styled(HeaderContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 1440px;
    height: 120px;
    padding: 20px 40px;
    background-color: white;
    box-shadow: 0 -2px 17px black;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 1;
`
