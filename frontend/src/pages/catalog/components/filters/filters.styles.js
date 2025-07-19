import styled from "styled-components"

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 80px 0 0 40px;

    .filters-title {
        font-size: 24px;
        font-weight: 600;
    }

    .select-container {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }

    .filters-reset {
        margin: 30px 0 0 0;
        font-size: 20px;
        width: 200px;
        height: 40px;
        color: white;
        background-color: #2c3333;
    }

    .filters-reset:hover {
        background-color: #dedede;
        color: #2c3333;
    }

    .filters-reset:active {
        background-color: #ea454c;
    }
`
