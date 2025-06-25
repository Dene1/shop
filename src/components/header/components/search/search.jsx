import { FiSearch } from "react-icons/fi"
import styled from "styled-components"

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

const SearchContainer = ({ className, searchPhrase, onChange }) => {
    return (
        <div className={ className }>
            <StyledInput value={ searchPhrase }
                         type="text"
                         placeholder="🔍︎ Поиск..."
                         onChange={ onChange }
            />
            <StyledButton>{ <FiSearch size={ 24 } /> }</StyledButton>
        </div>
    )
}

export const Search = styled(SearchContainer)`
    display: flex;
`
