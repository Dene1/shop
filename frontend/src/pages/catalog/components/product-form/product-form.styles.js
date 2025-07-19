import styled from "styled-components"

const ProductFormContainer = styled.div`
    margin: 0 100px;

    .edit-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .description {
        margin-top: 20px;
    }

    .size-container {
        display: grid;
        grid-template-columns: repeat(9, 0.2fr);
        gap: 14px;
    }

    .container {
        display: flex;
        flex-direction: row;
    }

    .delete {
        cursor: pointer;
    }

    .btn-add {
        cursor: pointer;
        height: 40px;
        width: 98px;
    }

    img {
        float: left;
        margin: 0 20px 10px 0;
    }

    .post-text {
        min-height: 80px;
        border: 1px solid black;
        font-size: 18px;
        white-space: pre-line;
        padding: 10px 10px;
    }
`

const Container = styled.div`
    text-align: center;
    font-size: 24px;

    a:link {
        cursor: pointer;
        text-decoration: underline;
    }

    a:link:hover {
        text-decoration: none;
        opacity: 0.8;
    }
`

const StyledSpan = styled.span`
    font-size: 20px;
    font-weight: 600;
`

export { ProductFormContainer, Container, StyledSpan }
