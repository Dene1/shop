import { Link, useNavigate } from "react-router-dom"
import { FiHeart, FiUsers } from "react-icons/fi"
import { FaSignOutAlt, FaWpforms } from "react-icons/fa"
import { LuShoppingBag, LuStepBack } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import { selectUserLogin, selectUserRole } from "@selectors"
import { logout } from "@actions"
import { ROLE } from "@constants"
import styled from "styled-components"
import { checkAccess } from "@utils"

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    justify-items: center;
    align-items: center;
    gap: 20px;
    margin: 8px;
`

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: 100px;
    height: 30px;
    border: 1px solid #2c3333;

    &:hover {
        cursor: pointer;
        background-color: #dedede;
    }
`

const StyledIcon = styled(Link)`
    &:hover {
        cursor: pointer;
        transform: scale(1.3);
        transition: transform 0.8s ease;
    }
`

const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;

    &:hover {
        cursor: pointer;
        transform: scale(1.3);
        transition: transform 0.8s ease;
    }
`

const CursorPointer = styled.div`
    cursor: pointer;

    & > .sign-out {
        font-size: 18px;
        margin-top: 8px;
    }
`

const UserName = styled.div`
    font-size: 18px;
    font-weight: 500;
`

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const roleId = useSelector(selectUserRole)
    const login = useSelector(selectUserLogin)

    const handleLogout = () => {
        dispatch(logout())
        sessionStorage.removeItem("userData")
        navigate("/")
    }
    console.log(roleId)

    const isAdmin = checkAccess([ROLE.ADMIN], roleId)
    console.log(roleId)

    return (
        <div className={className}>
            {roleId === ROLE.GUEST ? (
                <RightAligned>
                    <StyledLink to="/login">Войти</StyledLink>
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

export const ControlPanel = styled(ControlPanelContainer)``
