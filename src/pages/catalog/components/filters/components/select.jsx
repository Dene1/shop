import styled from "styled-components"

const SelectContainer = ({className, children, name, onChange, value}) => {
    return (
        <div className={className}>
            {name}
            <select onChange={onChange}
                    value={value}
            >
                {children.map((item) => <option key={item}
                                                value={item}
                >{item}</option>)}
            </select>
        </div>
    )
}

export const Select = styled(SelectContainer)`
    display: flex;
    flex-direction: column;
    margin: 10px 0 10px 10px;

    select {
        width: 160px;
        height: 20px;
        margin: 10px 0 0 10px;
    }
`
