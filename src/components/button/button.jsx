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
    font-size: 18px;
    width: ${({width = "100%"}) => width};
    height: 40px;
    color: white;
    border: 1px solid #2C3333;
    background-color: #EA454C;
    margin-top: 12px;

    &:hover {
        cursor: pointer;
        background-color: #dedede;
        color: #2C3333;
        border: 1px solid #5b6969;
    }
`
