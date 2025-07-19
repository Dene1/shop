import styled from "styled-components"

export const SizeModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;

    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        background-color: white;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .size-container {
        padding: 5px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .size-container.selected {
        background-color: #ea454c;
        color: white;
    }

    .selected-size {
        margin-top: 10px;
        font-weight: bold;
    }

    .buttons-container {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }
`
