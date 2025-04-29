import styled from "styled-components"

const ButtonContainer = ({children, className, ...props}) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    )
}

export const Button = styled(ButtonContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({fontSize = "18px"}) => fontSize};
    width: ${({width = "100%"}) => width};
    height: 40px;
    color: ${({color = "white"}) => color};
    border: 1px solid #2C3333;
    background-color: ${({backgroundColor = "#2C3333"}) => backgroundColor};


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
