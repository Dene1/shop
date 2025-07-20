import { useNavigate } from "react-router-dom"
import { FiHeart, FiUsers } from "react-icons/fi"
import { FaSignOutAlt, FaWpforms } from "react-icons/fa"
import { LuShoppingBag, LuStepBack } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import { selectUserLogin, selectUserRole } from "@/selectors"
import { logout } from "@/actions"
import { ROLE } from "@/constants"
import { checkAccess } from "@/utils"
import {
    CursorPointer,
    RightAligned,
    StyledButton,
    StyledIcon,
    StyledLink,
    UserName,
} from "@/components/header/components/control-panel/control-panel.styles"

export const ControlPanel = ({ className }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const roleId = useSelector(selectUserRole)
    const login = useSelector(selectUserLogin)

    const handleLogout = () => {
        dispatch(logout())
        sessionStorage.removeItem("userData")
        navigate("/")
    }

    const isAdmin = checkAccess([ROLE.ADMIN], roleId)

    return (
        <div className={className}>
            {roleId === ROLE.GUEST ? (
                <RightAligned>
                    <StyledLink to="/login">Sign In</StyledLink>
                </RightAligned>
            ) : (
                <RightAligned>
                    <UserName>{login}</UserName>
                    <CursorPointer>
                        <FaSignOutAlt
                            className="sign-out"
                            onClick={handleLogout}
                        />
                    </CursorPointer>
                </RightAligned>
            )}
            <RightAligned>
                <StyledButton onClick={() => navigate(-1)}>
                    <LuStepBack size={30} />
                </StyledButton>
                <StyledIcon to="/favorites">
                    <FiHeart size={30} />
                </StyledIcon>
                <StyledIcon to="/cart">
                    <LuShoppingBag size={30} />
                </StyledIcon>
                {isAdmin && (
                    <>
                        <StyledIcon to="/users">
                            <FiUsers size={30} />
                        </StyledIcon>
                        <StyledIcon to="/admin">
                            <FaWpforms size={31} />
                        </StyledIcon>
                    </>
                )}
            </RightAligned>
        </div>
    )
}
