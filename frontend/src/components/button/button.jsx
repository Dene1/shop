import styled from "styled-components"

const ButtonContainer = ({ children, className, ...props }) => {
    return (
        <button className={ className } { ...props }>
            { children }
        </button>
    )
}

export const Button = styled(ButtonContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: ${ ({ fontSize = "24px" }) => fontSize };
    font-weight: ${ ({ fontWeight = "500" }) => fontWeight };
    width: ${ ({ width = "100%" }) => width };
    height: ${ ({ height = "40px" }) => height };
    color: ${ ({ color = "white" }) => color };
    border: 1px solid #2C3333;
    background-color: ${ ({ backgroundColor = "#2C3333" }) => backgroundColor };
    font-family: "Bebas Neue", "Roboto Slab", serif;

    &:hover {
        cursor: pointer;
        background-color: #dedede;
        color: #2C3333;
        border: 1px solid #5b6969;
    }

    &:active {
        cursor: pointer;
        background-color: #EA454C;
        color: #dedede;
    }
`
