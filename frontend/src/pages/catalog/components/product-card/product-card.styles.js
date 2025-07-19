import styled from "styled-components"

export const ProductCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    border: 1px solid #2c3333;
    position: relative;

    .favorite {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;

        &:hover {
            fill: #ea454c;
            cursor: pointer;
            stroke: #5c656e;
        }
    }

    .size-container {
        cursor: pointer;
        padding: 5px;
        border: 1px solid #ccc;
        margin-right: 5px;
    }

    .size-container.selected {
        background-color: #ea454c;
        color: white;
    }

    .selected-size {
        margin-top: 10px;
        font-weight: bold;
    }

    .product-card--price {
        color: #5c656e;
        margin-top: auto;
        font:
            600 28px "Bebas Neue",
            sans-serif;
    }

    .product-card--title {
        text-align: center;
        display: flex;
        justify-content: center;
        margin-bottom: 4px;
        height: 80px;
        font:
            600 36px "Bebas Neue",
            sans-serif;
        max-height: 80px;
        overflow: hidden;
    }

    img {
        display: block;
        width: 100%;
        height: 260px;
    }

    .product-card-footer {
        padding: 5px;
        border-top: 1px solid #2c3333;
    }

    .product-card-buttons {
        display: flex;
        justify-content: center;
        margin: 5px;
        gap: 20px;
        align-items: center;
    }

    .rating {
        display: flex;
        align-items: center;
    }

    .reviews-count {
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        gap: 5px;
        align-items: center;
    }
`
