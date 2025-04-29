import {useState} from "react"
import {Review} from "./components"
import {Icon} from "../../../../components"
import {useDispatch, useSelector} from "react-redux"
import {selectUserId, selectUserRole} from "../../../../selectors"
import {useServerRequest} from "../../../../hooks"
import {addReviewAsync} from "../../../../actions"
import {ROLE} from "../../../../constants/index.js"
import styled from "styled-components"

const ReviewsContainer = ({className, reviews, productId}) => {
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
        <div className={className}>
            {!isGuest && (
                <div className="new-review">
                <textarea
                    name="review"
                    value={newReview}
                    placeholder="Комментарий..."
                    onChange={({target}) => setNewReview(target.value)}>

                </textarea>
                    <Icon id="fa-paper-plane-o" size="18px" margin="5px 0 0 10px"
                          onClick={() => onNewReviewAdd(userId, productId, newReview)}
                    />
                </div>
            )}
            <div className="reviews">
                {reviews.map(({id, author, content, publishedAt}) => (
                    <Review
                        key={id}
                        productId={productId}
                        id={id}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    )
}

export const Reviews = styled(ReviewsContainer)`
    width: 580px;
    margin: 0 auto;

    .new-review {
        display: flex;
        margin: 20px 0 10px;
        width: 100%;
    }

    .new-review textarea {
        width: 550px;
        height: 120px;
        font-size: 18px;
        resize: none;
        padding: 4px 0 0 8px;
    }
`
