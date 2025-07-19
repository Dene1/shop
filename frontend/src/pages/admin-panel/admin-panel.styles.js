import styled from "styled-components"

export const AdminPanelContainer = styled.div`
    margin: 0 20px;

    .container {
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }

    .add-product {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 30%;
        border: 1px solid #405060;
    }

    .add-product-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    h1 {
        text-align: center;
    }

    table {
        width: 50%;
        border-collapse: collapse;
    }

    th {
        text-transform: uppercase;
    }

    th,
    td {
        border: 1px solid black;
        padding: 4px;
        text-align: center;
    }

    td:first-child {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    td:not(:first-child) {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    td button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .product-text {
        min-height: 80px;
        border: 1px solid black;
        font-size: 18px;
        white-space: pre-line;
    }

    .edit-panel button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
`
