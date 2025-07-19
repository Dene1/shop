import { BRANDS_NAME, GENDER, PRICE, Select, SIZE } from "./components"
import { FiltersContainer } from "@/pages/catalog/components/filters/filters.styles"

export const Filters = ({
    onGenderFilter,
    onBrandFilter,
    onSizeFilter,
    onPriceFilter,
    onResetFilters,
    selectedGender,
    selectedBrand,
    selectedSize,
    selectedPrice,
}) => {
    const handleGenderFilter = (event) => onGenderFilter(event.target.value)
    const handleBrandFilter = (event) => onBrandFilter(event.target.value)
    const handleSizeFilter = (event) => onSizeFilter(event.target.value)
    const handlePriceFilter = (event) => onPriceFilter(event.target.value)

    return (
        <FiltersContainer>
            <div className="filters-title">Filters</div>

            <div className="select-container">
                <Select
                    name="Gender"
                    onChange={handleGenderFilter}
                    children={GENDER}
                    value={selectedGender}
                />

                <Select
                    name="Brand"
                    onChange={handleBrandFilter}
                    children={BRANDS_NAME}
                    value={selectedBrand}
                />

                <Select
                    name="Size"
                    onChange={handleSizeFilter}
                    children={SIZE}
                    value={selectedSize}
                />

                <Select
                    name="Price"
                    onChange={handlePriceFilter}
                    children={PRICE}
                    value={selectedPrice}
                />
            </div>

            <button className="filters-reset" onClick={onResetFilters}>
                Reset Filters
            </button>
        </FiltersContainer>
    )
}
