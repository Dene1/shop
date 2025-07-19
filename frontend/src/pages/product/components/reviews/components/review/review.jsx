import { CLOSE_MODAL, openModal, removeReviewAsync } from "@/actions"
import { useDispatch, useSelector } from "react-redux"
import { selectUserRole } from "@/selectors"
import { ROLE } from "@/constants"
import { FaRegCalendarAlt, FaRegTrashAlt, FaUserCircle } from "react-icons/fa"
import moment from "moment"
import { useState } from "react"
import { Modal } from "@/components"
import { ReviewContainer } from "@/pages/product/components/reviews/components/review/review.styles"

export const Review = ({ productId, id, author, content, publishedAt }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const userRole = useSelector(selectUserRole)

    const onReviewRemove = (id) => {
        dispatch(
            openModal({
                text: "Delete review?",
                onConfirm: () => {
                    setIsOpen(true)
                    dispatch(removeReviewAsync(productId, id))
                    setTimeout(() => {
                        setIsOpen(false)
                    }, 2000)
                    dispatch(CLOSE_MODAL)
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        )
    }

    const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole)
    const formattedDate = moment(publishedAt).format("DD-MM-YYYY, HH:mm")

    return (
        <ReviewContainer>
            {isOpen && <Modal text={"The review is deleted"} />}
            <div className="review">
                <div className="information-panel">
                    <div className="author">
                        <FaUserCircle size="18px" />
                        <div className="author-name"> {author}</div>
                    </div>
                    <div className="published-at">
                        <FaRegCalendarAlt size="18px" />
                        <div className="published-at"> {formattedDate}</div>
                    </div>
                </div>
                <div className="review-text">{content}</div>
            </div>

            {isAdminOrModerator && (
                <FaRegTrashAlt
                    size="20px"
                    className="remove-review-icon"
                    onClick={() => onReviewRemove(id)}
                />
            )}
        </ReviewContainer>
    )
}
