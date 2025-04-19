import styled from "styled-components"
import {useDispatch, useSelector} from "react-redux"
import {useMatch, useParams} from "react-router-dom"
import {useEffect, useLayoutEffect, useState} from "react"
import {useServerRequest} from "../../hooks/index.js"
import {loadProductAsync, RESET_PRODUCT_DATA} from "../../actions/index.js"
import {ROLE} from "../../constants/index.js"
import {selectProduct} from "../../selectors/index.js"

const ProductContainer = () => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const isCreating = !!useMatch("/product")
    const isEditing = !!useMatch("/product/:id/edit")
    const requestServer = useServerRequest()
    const post = useSelector(selectProduct)

    useLayoutEffect(() => {
        dispatch(RESET_PRODUCT_DATA)
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false)
            return
        }

        dispatch(loadProductAsync(requestServer, params.id)).then((postData) => {
            setError(postData.error)
            setIsLoading(false)
        })
    }, [dispatch, isCreating, params.id, requestServer]);

    if (isLoading) {
        return null
    }

    // const SpecificPostPage = isCreating || isEditing ? (
    //     <PrivateContent access={[ROLE.ADMIN]}>
    //         <div className={className}>
    //             <PostForm post={post}/>
    //         </div>
    //     </PrivateContent>
    // ) : (
    //     <div className={className}>
    //         <PostContent post={post}/>
    //         <Comments comments={post.comments} postId={post.id}/>
    //     </div>
    // )

    return error ? <Error error={error}/> : SpecificPostPage
}

export const Product = styled(ProductContainer)`
`
