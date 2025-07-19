import styled from "styled-components"

const FooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1440px;
    height: 120px;
    padding: 20px 40px;
    font-weight: 500;
    background-color: white;
    box-shadow: 0 2px 17px black;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    z-index: 5;

    .logo {
        color: #ea454c;
    }

    .container {
        display: flex;
        align-items: end;
        gap: 4px;
    }
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`

export { FooterContainer, StyledContainer }
