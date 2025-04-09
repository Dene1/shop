import {TableRow} from "../table-row/table-row.jsx"
import {useState} from "react"
import {useServerRequest} from "../../../../hooks"
import {PiFloppyDiskBold} from "react-icons/pi";
import {RiDeleteBin5Line} from "react-icons/ri";
import styled from "styled-components"

const StyledFloppyDiskIcon = styled(PiFloppyDiskBold)`
    cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};
    fill: ${({disabled}) => disabled ? "#ccc" : "#2C3333"};
    font-size: 24px;
    align-items: center;
    pointer-events: ${({disabled}) => disabled ? "none" : "auto"};
`

const UserRowContainer = ({
                              className,
                              id,
                              login,
                              registeredAt,
                              roleId: userRoleId,
                              roles,
                              onUserRemove,
                          }) => {
    const [initialRoleId, setInitialRoleId] = useState(userRoleId)
    const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)
    const requestServer = useServerRequest()

    const onRoleChange = ({target}) => {
        setSelectedRoleId(Number(target.value))
    }

    const onRoleSave = (userId, newUserRoleId) => {
        requestServer("updateUserRole", userId, newUserRoleId).then(() => {
            console.log("updateUserRole", userId, newUserRoleId)
            setInitialRoleId(newUserRoleId)
        })
    }

    const isSaveButtonDisabled = selectedRoleId === initialRoleId

    return (
        <div className={className}>
            <TableRow border={true}>
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{registeredAt}</div>
                <div className="role-column">
                    <select value={selectedRoleId} onChange={onRoleChange}>
                        {roles.map(({id: roleId, name: roleName}) => (
                            <option key={roleId} value={roleId}>{roleName}</option>
                        ))}
                    </select>

                    <div className="save-role-button">
                        <StyledFloppyDiskIcon aria-hidden={true}
                                              disabled={isSaveButtonDisabled}
                                              onClick={() => onRoleSave(id, selectedRoleId)}/>
                    </div>
                </div>
            </TableRow>
            <div className="remove-user-button">
                <RiDeleteBin5Line size="24px" onClick={onUserRemove}/>
            </div>
        </div>
    )
}

export const UserRow = styled(UserRowContainer)`
    display: flex;
    align-items: center;
    margin-top: 10px;

    & select {
        padding: 0 5px;
        font-size: 16px;
    }

    & .save-role-button {
        width: 20px;
        height: 30px;
        margin: 6px 0 0 6px;
        text-align: center;
    }

    & .remove-user-button {
        margin: 0 0 0 10px;
        cursor: pointer;
        align-items: center;
    }
`
