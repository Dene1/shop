import { useDispatch, useSelector } from "react-redux"
import { useMatch, useParams } from "react-router-dom"
import { useEffect, useLayoutEffect, useState } from "react"
import { useServerRequest } from "../../hooks/index.js"
import { loadProductAsync, RESET_PRODUCT_DATA } from "../../actions/index.js"
import { selectProduct } from "../../selectors/index.js"
import { Error, Loader, PrivateContent } from "../../components/index.js"
import { ROLE } from "../../constants/index.js"
import { ProductContent, Reviews } from "./components/index.js"
import styled from "styled-components"
import { ProductForm } from "../catalog/components/product-form/product-form.jsx"

const ProductContainer = ({ className }) => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const isCreating = !!useMatch("/product")
    const isEditing = !!useMatch("/product/:id/edit")
    const requestServer = useServerRequest()
    const product = useSelector(selectProduct)

    useLayoutEffect(() => {
        dispatch(RESET_PRODUCT_DATA)
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false)
            return
        }
        dispatch(loadProductAsync(requestServer, params.id)).then((productData) => {
            setError(productData.error)
            setIsLoading(false)
        })
    }, [dispatch, isCreating, params.id, requestServer]);

    if (isLoading) {
        return <Loader isLoading={ isLoading } />
    }

    const SpecificPostPage = isCreating || isEditing ? (
        <PrivateContent access={ [ROLE.ADMIN] }>
            <div className={ className }>
                <ProductForm product={ product } />
            </div>
        </PrivateContent>
    ) : (
        <div className={ className }>
            <ProductContent product={ product } />
            <Reviews reviews={ product.reviews }
                     productId={ product.id }
            />
        </div>
    )
    return error ? <Error error={ error } /> : SpecificPostPage
}

export const Product = styled(ProductContainer)`
`
