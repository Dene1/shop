import { CLOSE_MODAL, openModal, removeReviewAsync } from "../../../../../../actions"
import { useDispatch, useSelector } from "react-redux"
import { useServerRequest } from "../../../../../../hooks"
import { selectUserRole } from "../../../../../../selectors"
import { ROLE } from "../../../../../../constants"
import { FaRegCalendarAlt, FaRegTrashAlt, FaUserCircle } from "react-icons/fa";
import styled from "styled-components"

const ReviewContainer = ({ className, productId, id, author, content, publishedAt }) => {
    const dispatch = useDispatch()
    const requestServer = useServerRequest()
    const userRole = useSelector(selectUserRole)

    const onReviewRemove = (id) => {
        dispatch(openModal({
            text: "Удалить отзыв?",
            onConfirm: () => {
                dispatch(removeReviewAsync(requestServer, productId, id));
                dispatch(CLOSE_MODAL);
            },
            onCancel: () => dispatch(CLOSE_MODAL),
        }))
    }

    const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole)

    return (
        <div className={ className }>
            <div className="review">
                <div className="information-panel">
                    <div className="author">
                        <FaUserCircle size="18px" />
                        <div className="author-name"> { author }</div>
                    </div>
                    <div className="published-at">
                        <FaRegCalendarAlt size="18px" />
                        <div className="published-at"> { publishedAt }</div>
                    </div>
                </div>
                <div className="review-text">{ content }</div>
            </div>

            { isAdminOrModerator && (
                <div className="remove-review">
                    <FaRegTrashAlt size="20px"
                                   className="remove-review-icon"
                                   onClick={ () => onReviewRemove(id) }
                    />
                </div>
            ) }
        </div>
    )
}

export const Review = styled(ReviewContainer)`
    display: flex;
    align-items: center;
    margin-top: 10px;

    .review {
        border: 1px solid black;
        padding: 5px 10px;
        width: 550px;
    }

    .published-at {
        margin: 0 0 0 5px;
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
    }

    .published-at {
        display: flex;
    }

    .review-text {
        margin: 10px 0 0;
    }

    .remove-review {
        margin: 5px 0 0 8px;
    }

    .remove-review-icon {
        cursor: pointer;
    }
`
