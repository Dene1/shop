import { useState } from "react"
import { FaRegPaperPlane } from "react-icons/fa";
import { Review } from "./components"
import { useDispatch, useSelector } from "react-redux"
import { selectUserId, selectUserRole } from "../../../../selectors"
import { useServerRequest } from "../../../../hooks"
import { addReviewAsync } from "../../../../actions"
import { ROLE } from "../../../../constants/index.js"
import styled from "styled-components"

const ReviewsContainer = ({ className, reviews, productId }) => {
    const [newReview, setNewReview] = useState("")
    const userId = useSelector(selectUserId)
    const userRole = useSelector(selectUserRole)
    const dispatch = useDispatch()
    const requestServer = useServerRequest()

    const onNewReviewAdd = (userId, productId, content) => {
        dispatch(addReviewAsync(requestServer, userId, productId, content))
        setNewReview("")
    }

    const isGuest = userRole === ROLE.GUEST

    return (
        <div className={ className }>
            <h1 className="title">Reviews</h1>
            { !isGuest && (
                <div className="new-review">
                <textarea
                    name="review"
                    value={ newReview }
                    placeholder="Комментарий..."
                    onChange={ ({ target }) => setNewReview(target.value) }
                >

                </textarea>
                    <div className="paper-plane">
                        <FaRegPaperPlane size="18px"
                                         onClick={ () => onNewReviewAdd(userId, productId, newReview) }
                        />
                    </div>
                </div>
            ) }

            <div className="reviews">
                { reviews.map(({ id, author, content, publishedAt }) => (
                    <Review
                        key={ id }
                        productId={ productId }
                        id={ id }
                        author={ author }
                        content={ content }
                        publishedAt={ publishedAt }
                    />
                )) }
            </div>
        </div>
    )
}

export const Reviews = styled(ReviewsContainer)`
    width: 580px;
    margin: 0 auto;


    .title {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .new-review {
        display: flex;
        margin: 20px 0 10px;
        width: 100%;
    }

    span {
        display: block;
        margin: 10px 0 10px;
        text-align: center;
        font-weight: 600;
        font-size: 24px;
    }

    .paper-plane {
        margin: 4px 0 0 10px;
        cursor: pointer;
    }

    .reviews {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .new-review textarea {
        width: 550px;
        height: 120px;
        font-size: 18px;
        resize: none;
        padding: 4px 0 0 10px;
    }
`
