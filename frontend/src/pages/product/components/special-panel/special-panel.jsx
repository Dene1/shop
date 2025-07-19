import { Icon } from "@/components"
import { CLOSE_MODAL, openModal, removeProductAsync } from "@/actions"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { checkAccess } from "@/utils"
import { ROLE } from "@/constants"
import { selectUserRole } from "@/selectors"
import { FaRegTrashAlt } from "react-icons/fa"
import { SpecialPanelContainer } from "@/pages/product/components/special-panel/special-panel.styles"

export const SpecialPanel = ({ id, publishedAt, editButton }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const roleId = useSelector(selectUserRole)

    const onPostRemove = (id) => {
        dispatch(
            openModal({
                text: "Удалить продукт?",
                onConfirm: () => {
                    dispatch(removeProductAsync(id)).then(() => navigate("/"))
                    dispatch(CLOSE_MODAL)
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        )
    }

    const isAdmin = checkAccess([ROLE.ADMIN], roleId)

    return (
        <SpecialPanelContainer>
            <div className="published-at">
                {publishedAt && (
                    <Icon
                        inactive={true}
                        id="fa-calendar-o"
                        margin="0 7px 0 0"
                        size="18px"
                    />
                )}
                {publishedAt}
            </div>
            {isAdmin && (
                <div className="buttons">
                    {editButton}
                    {publishedAt && (
                        <FaRegTrashAlt
                            size="21px"
                            margin="0 0 0 7px"
                            onClick={() => onPostRemove(id)}
                        />
                    )}
                </div>
            )}
        </SpecialPanelContainer>
    )
}
