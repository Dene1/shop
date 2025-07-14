import { useEffect, useState } from "react"
import { ConfirmModal, Modal, PrivateContent } from "@/components"
import { TableRow, UserRow } from "./components"
import { ROLE } from "@/constants"
import { checkAccess } from "@/utils"
import { useDispatch, useSelector } from "react-redux"
import { selectUserRole } from "@/selectors"
import { request } from "@/utils/request"
import { CLOSE_MODAL, openModal } from "@/actions"
import styled from "styled-components"

const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
    const userRole = useSelector(selectUserRole)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return
        }

        Promise.all([request("/users"), request("/users/roles")]).then(
            ([usersRes, rolesRes]) => {
                if (usersRes.error || rolesRes.error) {
                    setErrorMessage(usersRes.error || rolesRes.error)
                    return
                }
                setUsers(usersRes.data)
                setRoles(rolesRes.data)
            },
        )
    }, [shouldUpdateUserList, userRole])

    const onUserRemove = (userId) => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return
        }

        dispatch(
            openModal({
                text: "Delete the user?",
                onConfirm: () => {
                    request(`/users/${userId}`, "DELETE").then(() => {
                        setShouldUpdateUserList(!shouldUpdateUserList)
                    })
                    setIsOpen(true)
                    setTimeout(() => {
                        setIsOpen(false)
                    }, 2000)
                    dispatch(CLOSE_MODAL)
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        )
    }

    return (
        <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
            {isOpen && <Modal text={"The user is deleted"} />}
            <ConfirmModal text={"Delete the user?"} />
            <div className={className}>
                <h1>Users</h1>
                <div className="table">
                    <TableRow>
                        <div className="login-column">Login</div>
                        <div className="registered-at-column">
                            Registered at
                        </div>
                        <div className="role-column">Role</div>
                    </TableRow>
                    {users.map(({ id, login, registeredAt, roleId }) => (
                        <UserRow
                            key={id}
                            id={id}
                            login={login}
                            registeredAt={registeredAt}
                            roleId={roleId}
                            roles={roles.filter(
                                ({ id: roleId }) => roleId !== ROLE.GUEST,
                            )}
                            onUserRemove={() => onUserRemove(id)}
                        />
                    ))}
                </div>
            </div>
        </PrivateContent>
    )
}

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    width: 570px;
    font-size: 18px;

    .table {
        margin-top: 20px;
    }
`
