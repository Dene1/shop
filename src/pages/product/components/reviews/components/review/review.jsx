import {Icon} from "../../../../../../components"
import {CLOSE_MODAL, openModal, removeReviewAsync} from "../../../../../../actions"
import {useDispatch, useSelector} from "react-redux"
import {useServerRequest} from "../../../../../../hooks"
import {selectUserRole} from "../../../../../../selectors"
import {ROLE} from "../../../../../../constants"
import styled from "styled-components"

const ReviewContainer = ({className, productId, id, author, content, publishedAt}) => {
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
        <div className={className}>
            <div className="review">
                <div className="information-panel">
                    <div className="author">
                        <Icon id="fa-user-circle-o" margin="0 7px 0 0" size="18px"/>
                        {author}
                    </div>
                    <div className="published-at">
                        <Icon
                            inactive={true}
                            id="fa-calendar-o"
                            margin="0 7px 0 0"
                            size="18px"/>
                        {publishedAt}
                    </div>
                </div>
                <div className="review-text">{content}</div>
            </div>

            {isAdminOrModerator && (
                <Icon id="fa-trash-o" margin="5px 0 0 10px" size="20px"
                      onClick={() => onReviewRemove(id)}
                />
            )}
        </div>
    )
}

export const Review = styled(ReviewContainer)`
    display: flex;
    margin-top: 10px;

    .review {
        border: 1px solid black;
        padding: 5px 10px;
        width: 550px;
    }

    .information-panel {
        display: flex;
        justify-content: space-between;
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
`
