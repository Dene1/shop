import styled from "styled-components"

export const ReviewsContainer = styled.div`
    width: 580px;
    margin: 0 auto;

    .title {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .new-review {
        display: flex;
        margin: 20px 0 10px;
        width: 100%;
    }

    .paper-plane {
        margin: 6px 0 0 10px;
        cursor: pointer;
    }

    .reviews {
        display: flex;
        flex-direction: column;
    }

    .new-review textarea {
        width: 550px;
        height: 120px;
        font-size: 18px;
        resize: none;
        padding: 4px 0 0 10px;
    }
`
