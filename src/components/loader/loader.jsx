import {DotSpinner} from "ldrs/react"
import "ldrs/react/DotSpinner.css";
import styled from "styled-components"

const LoaderContainer = ({className, isLoading}) => {
    return (
        <div className={className}
             aria-busy={isLoading}
        >
            {isLoading && <DotSpinner color="#EA454C"
                                      size={50}
            />}
        </div>
    )
}

export const Loader = styled(LoaderContainer)`
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
