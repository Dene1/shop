import styled from "styled-components"

export const CatalogContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 18px;
    margin: 20px;

    .sort {
        margin-left: 60px;
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 240px;
        align-items: flex-end;
    }

    .no-posts-found {
        text-align: center;
        margin: 20px 0 0 40px;
        font-size: 24px;
        font-weight: 600;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`
