import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import {FiUser, FiHeart, FiUsers} from "react-icons/fi";
import {LuStepBack} from "react-icons/lu";
import {FaSignOutAlt} from "react-icons/fa";
import {PiHandbagSimpleBold} from "react-icons/pi";
import {useDispatch, useSelector} from "react-redux"
import {selectUserRole, selectUserLogin, selectUserSession} from "../../../../selectors"
import {logout} from "../../../../actions"
import {ROLE} from "../../../../constants"

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    margin: 10px;
`

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: 100px;
    height: 30px;
    border: 1px solid black;
    border-radius: 6px;

    &:hover {
        cursor: pointer;
        background-color: #e0e0e0;
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
`

const UserName = styled.div`
    font-size: 18px;
    font-weight: bold;
`

const ControlPanelContainer = ({className}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const roleId = useSelector(selectUserRole)
    const login = useSelector(selectUserLogin)
    const session = useSelector(selectUserSession)

    const handleLogout = () => {
        dispatch(logout(session));
        navigate("/");
    };

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
                        <FaSignOutAlt onClick={handleLogout}/>
                    </CursorPointer>
                </RightAligned>
            )}
            <RightAligned>
                <StyledButton onClick={() => navigate(-1)}>
                    <LuStepBack size={30}/>
                </StyledButton>
                <StyledIcon to="/favorites"><FiHeart size={30}/></StyledIcon>
                <StyledIcon to="/basket"><PiHandbagSimpleBold size={30}/></StyledIcon>
                <StyledIcon to="/login"><FiUser size={30}/></StyledIcon>
                {roleId === ROLE.ADMIN &&
                    <StyledIcon to="/users"><FiUsers size={30}/></StyledIcon>}
            </RightAligned>
        </div>
    )
}

export const ControlPanel = styled(ControlPanelContainer)` `
