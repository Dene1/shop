import styled from "styled-components"
import { Link } from "react-router-dom"

const Container = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 46.7%;
    text-decoration: none;
    color: #2c3333;
`
const CartItemContainer = styled.li`
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin: 20px 0 0 40px;

    .q-value {
        font:
            500 20px "Bebas Neue",
            sans-serif;
    }

    .quantity-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .dot {
        display: flex;
        align-items: center;
    }

    .container {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .quantity {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        gap: 10px;
        z-index: 5;
    }

    .quantity-title {
        font:
            500 24px "Bebas Neue",
            sans-serif;
        letter-spacing: 1px;
        color: gray;
    }

    .size {
        font:
            700 18px "Bebas Neue",
            sans-serif;
        color: #2c3333;
    }

    .q-btn {
        font-size: 20px;
        width: 30px;
        height: 30px;
        background-color: #dedede;
        color: #2c3333;
        border: 1px solid #5b6969;

        &:hover {
            cursor: pointer;
            background-color: transparent;
            color: #2c3333;
            border: 1px solid #5b6969;
        }

        &:active {
            cursor: pointer;
            background-color: #ea454c;
            color: #dedede;
        }

        &:disabled {
            cursor: not-allowed;
            background-color: white;
            color: #5b6969;
            border: 1px solid #5b6969;
        }
    }

    .product-price {
        font:
            500 24px "Bebas Neue",
            sans-serif;
    }

    .subtotal-price {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        gap: 10px;
    }

    .subtotal-price-title {
        font:
            500 24px "Bebas Neue",
            sans-serif;
        letter-spacing: 1px;
        color: gray;
    }

    .subtotal-price-value {
        font:
            500 24px "Bebas Neue",
            sans-serif;
    }

    span {
        color: gray;
    }

    img {
        border: 1px solid #ccc;
        width: 130px;
        height: 100px;
    }

    .product-title {
        font-weight: bolder;
        font-size: 20px;
        text-transform: uppercase;
    }

    .product-info {
        color: gray;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
    }

    .remove-from-cart {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
`

export { Container, CartItemContainer }
