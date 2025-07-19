import { DotSpinner } from "ldrs/react"
import "ldrs/react/DotSpinner.css"
import { LoaderContainer } from "@/components/loader/loader.styles"

export const Loader = ({ isLoading }) => {
    return (
        <LoaderContainer aria-busy={isLoading}>
            {isLoading && <DotSpinner color="#EA454C" size={50} />}
        </LoaderContainer>
    )
}
