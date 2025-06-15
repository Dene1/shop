import {Icon} from "../../../../components"
import {
    CLOSE_MODAL,
    openModal,
    removeProductAsync
} from "../../../../actions"
import {useDispatch, useSelector} from "react-redux"
import {useServerRequest} from "../../../../hooks"
import {useNavigate} from "react-router-dom"
import {checkAccess} from "../../../../utils"
import {ROLE} from "../../../../constants"
import {selectUserRole} from "../../../../selectors"
import {FaRegTrashAlt} from "react-icons/fa";
import styled from "styled-components"

const SpecialPanelContainer = ({className, id, publishedAt, editButton}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const requestServer = useServerRequest()
    const roleId = useSelector(selectUserRole)

    const onPostRemove = (id) => {
        dispatch(openModal({
            text: "Удалить статью?",
            onConfirm: () => {
                dispatch(removeProductAsync(requestServer, id)).then(() => navigate("/"));
                dispatch(CLOSE_MODAL);
            },
            onCancel: () => dispatch(CLOSE_MODAL),
        }))
    }

    const isAdmin = checkAccess([ROLE.ADMIN], roleId)

    return (
        <div className={className}>
            <div className="published-at">
                {publishedAt &&
                    <Icon inactive={true}
                          id="fa-calendar-o"
                          margin="0 7px 0 0"
                          size="18px"
                    />}
                {publishedAt}
            </div>
            {isAdmin && (
                <div className="buttons">
                    {editButton}
                    {publishedAt &&
                        <FaRegTrashAlt size="21px"
                                       margin="0 0 0 7px"
                                       onClick={() => onPostRemove(id)}
                        />}
                </div>
            )}
        </div>
    )
}

export const SpecialPanel = styled(SpecialPanelContainer)`
    display: flex;
    justify-content: space-between;
    margin: ${({margin}) => margin};
    cursor: pointer;

    .published-at {
        display: flex;
        font-size: 18px;
    }

    .buttons {
        display: flex;
    }

    i {
        position: relative;
    }
`
