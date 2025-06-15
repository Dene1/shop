import {forwardRef} from "react"
import styled from "styled-components"

const InputContainer = forwardRef(({className, ...props}, ref) => {
    return <input className={className} {...props}
                  ref={ref}
    />
})

export const Input = styled(InputContainer)`
    height: 40px;
    margin: 0 0 10px 0;
    padding: 10px;
    width: ${({width = "100%"}) => width};
    border: 1px solid black;
    font-size: 18px;
`
