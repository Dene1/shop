import { FiSearch } from "react-icons/fi"
import {
    SearchContainer,
    StyledButton,
    StyledInput,
} from "@/components/header/components/search/search.styles"

export const Search = ({ searchPhrase, onChange }) => {
    return (
        <SearchContainer>
            <StyledInput
                value={searchPhrase}
                type="text"
                placeholder="🔍︎ Search..."
                onChange={onChange}
            />
            <StyledButton>{<FiSearch size={24} />}</StyledButton>
        </SearchContainer>
    )
}
