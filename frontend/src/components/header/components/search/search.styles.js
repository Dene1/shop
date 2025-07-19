import styled from "styled-components"

const SearchContainer = styled.div`
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

export { SearchContainer, StyledInput, StyledButton }
