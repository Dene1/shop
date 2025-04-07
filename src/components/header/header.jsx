import styled from "styled-components"
import {ControlPanel, Logo} from "./components/index.js"
import {FiSearch} from "react-icons/fi";

const Discription = styled.div`
    display: flex;
`

const StyledInput = styled.input`
    border: 1px solid rgba(44, 51, 51, 0.55);
    border-right: none;
    padding: 8px 20px;
    font-size: 16px;
`

const StyledButton = styled.button`
    background-color: transparent;
    border: 1px solid rgba(44, 51, 51, 0.55);
    cursor: pointer;
    padding: 8px;
    opacity: 0.8;
`

const HeaderContainer = ({className}) => (
    <header className={className}>
        <Logo/>
        <Discription>
            <StyledInput type="text" placeholder="🔍︎ Поиск..."/>
            <StyledButton>{<FiSearch size={24}/>}</StyledButton>
        </Discription>
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
