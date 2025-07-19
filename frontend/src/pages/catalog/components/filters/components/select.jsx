import { SelectContainer } from "@/pages/catalog/components/filters/components/select.styles"

export const Select = ({ children, name, onChange, value }) => {
    return (
        <SelectContainer>
            {name}
            <select onChange={onChange} value={value}>
                {children.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </SelectContainer>
    )
}
