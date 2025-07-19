import styled from "styled-components"

export const ProductModalContainer = styled.div`
    position: fixed;
    top: 10px;
    transform: translateX(-50%);
    left: 72%;
    max-width: 300px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    background-color: #f0f0f0;
    padding: 8px 60px;
    border: 1px solid #ea454c;
    border-radius: 5px;
    z-index: 50;

    .notification-text {
        text-transform: uppercase;
        text-align: center;
    }
`
