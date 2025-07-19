import styled from "styled-components"

export const SpecialPanelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: ${({ margin }) => margin};
    cursor: pointer;

    .published-at {
        display: flex;
        font-size: 18px;
    }

    .buttons {
        display: flex;
    }

    i {
        position: relative;
    }
`
