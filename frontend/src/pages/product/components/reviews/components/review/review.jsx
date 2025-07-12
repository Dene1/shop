import { CLOSE_MODAL, openModal, removeReviewAsync } from "@actions"
import { useDispatch, useSelector } from "react-redux"
import { selectUserRole } from "@selectors"
import { ROLE } from "@constants"
import { FaRegCalendarAlt, FaRegTrashAlt, FaUserCircle } from "react-icons/fa"
import styled from "styled-components"
import moment from "moment"
import { useState } from "react"
import { Modal } from "@components"

const ReviewContainer = ({
    className,
    productId,
    id,
    author,
    content,
    publishedAt,
}) => {
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
        <div className={className}>
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
        </div>
    )
}

export const Review = styled(ReviewContainer)`
    display: flex;
    align-items: flex-start;
    margin-top: 10px;

    .review {
        border: 1px solid black;
        padding: 5px 10px;
        width: 550px;
        max-width: 100%;
        box-sizing: border-box;
        overflow-wrap: break-word;
        word-break: break-word;
        white-space: pre-wrap;
        text-align: left;
    }

    .published-at {
        margin: 0 0 0 5px;
        display: flex;
        align-items: center;
    }

    .information-panel {
        display: flex;
        justify-content: space-between;
    }

    .author-name {
        margin: 0 0 0 5px;
    }

    .author {
        display: flex;
        align-items: center;
    }

    .published-at {
        display: flex;
    }

    .remove-review-icon {
        display: flex;
        margin: 6px 0 0 10px;
        cursor: pointer;
    }
`
