import styled from "styled-components"

export const ProductContentContainer = styled.div`
    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 24px 60px;
    }

    .sizes {
        display: flex;
        flex-direction: row;
        gap: 50px;
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

    .product {
        display: flex;
        flex-direction: row;
        margin: 20px;
    }

    .heart {
        cursor: pointer;
        align-self: center;

        &:hover {
            fill: #ea454c;
            cursor: pointer;
            stroke: #5c656e;
        }
    }

    .description {
        margin-inline: 40px;
        text-align: center;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 40px;
    }

    .product-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .product-title {
    }

    .back {
        border: 1px solid #dedede;
        color: #2c3333;
        width: 100px;
        height: 30px;
        cursor: pointer;
        font-size: 18px;
    }

    .content-title {
        font-size: 30px;
        font-weight: 600;
    }

    .reviews {
        display: flex;
        flex-direction: row;
        gap: 4px;
        align-items: center;
        font-size: 18px;
    }

    .price-container {
        display: flex;
        flex-direction: row;
        gap: 60px;
    }

    .price {
        font-size: 54px;
        font-weight: 600;
        color: #4e6173;
    }

    .size-container {
        border: 1px solid #2c3333;
        padding: 5px 10px;
        user-select: none;
        align-self: center;
    }

    .size-container:hover {
        cursor: pointer;
        background-color: #dedede;
    }

    .size-container:active {
        background-color: #ea454c;
        color: #fff;
    }

    .product-description {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    img {
        float: left;
        width: 800px;
        margin: 0 20px 10px 0;
    }

    .size-items {
        display: flex;
        flex-direction: row;
        gap: 5px 10px;
    }

    .product-description {
        font-size: 18px;
        white-space: pre-line;
    }
`
