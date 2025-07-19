import { TableRow } from "../table-row/table-row.jsx"
import { useState } from "react"
import { PiFloppyDiskBold } from "react-icons/pi"
import { RiDeleteBin5Line } from "react-icons/ri"
import styled from "styled-components"
import { request } from "@/utils/request"
import { Modal } from "@/components"
import moment from "moment"
import { UserRowContainer } from "@/pages/users/components/user-row/user-row.styles"

const StyledFloppyDiskIcon = styled(PiFloppyDiskBold)`
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    fill: ${({ disabled }) => (disabled ? "#ccc" : "#2C3333")};
    font-size: 24px;
    align-items: center;
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`

export const UserRow = ({
    id,
    login,
    registeredAt,
    roleId: userRoleId,
    roles,
    onUserRemove,
}) => {
    const [initialRoleId, setInitialRoleId] = useState(userRoleId)
    const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)
    const [isOpen, setIsOpen] = useState(false)

    const onRoleChange = ({ target }) => {
        setSelectedRoleId(Number(target.value))
    }

    const onRoleSave = (userId, newUserRoleId) => {
        request(`/users/${userId}`, "PATCH", { roleId: newUserRoleId }).then(
            () => {
                setInitialRoleId(newUserRoleId)
                setIsOpen(true)
                setTimeout(() => setIsOpen(false), 2000)
            },
        )
    }

    const isSaveButtonDisabled = selectedRoleId === initialRoleId
    const formattedDate = moment(registeredAt).format("DD-MM-YYYY")

    return (
        <UserRowContainer>
            <TableRow border={true}>
                {isOpen && <Modal text={"Successfully preserved"} />}
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{formattedDate}</div>
                <div className="role-column">
                    <select value={selectedRoleId} onChange={onRoleChange}>
                        {roles.map(({ id: roleId, name: roleName }) => (
                            <option key={roleId} value={roleId}>
                                {roleName}
                            </option>
                        ))}
                    </select>

                    <div className="save-role-button">
                        <StyledFloppyDiskIcon
                            aria-hidden={true}
                            disabled={isSaveButtonDisabled}
                            onClick={() => onRoleSave(id, selectedRoleId)}
                        />
                    </div>
                </div>
            </TableRow>
            <div className="remove-user-button">
                <RiDeleteBin5Line size="24px" onClick={onUserRemove} />
            </div>
        </UserRowContainer>
    )
}
