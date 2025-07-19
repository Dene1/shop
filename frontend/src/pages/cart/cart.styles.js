import styled from "styled-components"

const StyledH1 = styled.h1`
    text-transform: uppercase;
    text-align: center;
`

const CartContainer = styled.div`
    ul {
        list-style-type: disc;
    }

    .total {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 30.6%;
        font-size: 20px;
        gap: 30px;
        text-align: center;
    }

    h2 {
        font:
            500 24px "Bebas Neue",
            sans-serif;
        letter-spacing: 1px;
        color: gray;
    }

    span {
        color: gray;
    }

    .total-item {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .total-price {
        font:
            500 34px "Bebas Neue",
            sans-serif;
        letter-spacing: 1px;
    }

    .buttons-container {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 100px;
    }
`

export { CartContainer, StyledH1 }
