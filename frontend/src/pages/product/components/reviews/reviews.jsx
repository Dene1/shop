import { useState } from "react"
import { FaRegPaperPlane } from "react-icons/fa"
import { Review } from "./components"
import { useDispatch, useSelector } from "react-redux"
import { selectUserRole } from "@/selectors"
import { addReviewAsync } from "@/actions"
import { ROLE } from "@/constants"
import { Modal } from "@/components"
import { ReviewsContainer } from "@/pages/product/components/reviews/reviews.styles"

export const Reviews = ({ reviews, productId }) => {
    const [newReview, setNewReview] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const userRole = useSelector(selectUserRole)
    const dispatch = useDispatch()

    const onNewReviewAdd = (productId, content) => {
        dispatch(addReviewAsync(productId, content))
        setIsOpen(true)
        setTimeout(() => {
            setIsOpen(false)
        }, 2000)
        setNewReview("")
    }

    const isGuest = userRole === ROLE.GUEST

    return (
        <ReviewsContainer>
            {isOpen && <Modal text={"Review added"} />}
            <h1 className="title">Reviews</h1>
            {!isGuest && (
                <div className="new-review">
                    <textarea
                        name="review"
                        value={newReview}
                        placeholder="Write a review..."
                        onChange={({ target }) => setNewReview(target.value)}
                    ></textarea>
                    <FaRegPaperPlane
                        className="paper-plane"
                        size="18px"
                        onClick={() => onNewReviewAdd(productId, newReview)}
                    />
                </div>
            )}

            <div className="reviews">
                {reviews.map(({ id, author, content, publishedAt }) => (
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
        </ReviewsContainer>
    )
}
