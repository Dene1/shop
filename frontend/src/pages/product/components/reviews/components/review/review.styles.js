import styled from "styled-components"

export const ReviewContainer = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 10px;

    .review {
        border: 1px solid black;
        padding: 5px 10px;
        width: 550px;
        max-width: 100%;
        box-sizing: border-box;
        overflow-wrap: break-word;
        word-break: break-word;
        white-space: pre-wrap;
        text-align: left;
    }

    .published-at {
        margin: 0 0 0 5px;
        display: flex;
        align-items: center;
    }

    .information-panel {
        display: flex;
        justify-content: space-between;
    }

    .author-name {
        margin: 0 0 0 5px;
    }

    .author {
        display: flex;
        align-items: center;
    }

    .published-at {
        display: flex;
    }

    .remove-review-icon {
        display: flex;
        margin: 6px 0 0 10px;
        cursor: pointer;
    }
`
