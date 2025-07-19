import styled from "styled-components"

export const ProductListContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: row;

    .product-list {
        display: grid;
        align-items: stretch;
        margin: 20px 0 0 40px;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
    }
`
