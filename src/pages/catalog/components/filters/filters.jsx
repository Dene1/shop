import styled from "styled-components"
import {BRANDS_NAME, SIZE, PRICE, GENDER, Select} from "./components/index.js"


const FiltersContainer = ({
                              className,
                              onGenderFilter,
                              onBrandFilter,
                              onSizeFilter,
                              onPriceFilter,
                              onResetFilters,
                              selectedGender,
                              selectedBrand,
                              selectedSize,
                              selectedPrice
                          }) => {
    const parsePriceRange = (priceRange) => {
        if (priceRange === "All" || !priceRange) {
            return
        }
        if (priceRange === "$10000+") {
            return {minPrice: 10000, maxPrice: Infinity};
        }
        const trimmedPriceRange = priceRange.replace(/\$/g, "").trim(); // Удаляем пробелы
        const [min, max] = trimmedPriceRange.split(" - ");
        return {minPrice: parseFloat(min), maxPrice: parseFloat(max)};
    };

    const handleGenderFilter = (event) => {
        onGenderFilter(event.target.value)
    }

    const handleBrandFilter = (event) => {
        onBrandFilter(event.target.value)
    }

    const handleSizeFilter = (event) => {
        onSizeFilter(event.target.value)
    }

    const handlePriceFilter = (event) => {
        const priceRange = event.target.value;
        onPriceFilter(parsePriceRange(priceRange));
    }

    console.log(selectedGender, selectedBrand, selectedSize, selectedPrice)

    return (
        <div className={className}>
            <div className="filters-title">Фильтры</div>

            <div className="select-container">
                <Select name="Gender" onChange={handleGenderFilter} children={GENDER}
                        value={selectedGender}/>

                <Select name="Brand" onChange={handleBrandFilter} children={BRANDS_NAME}
                        value={selectedBrand}/>

                <Select name="Size" onChange={handleSizeFilter} children={SIZE}
                        value={selectedSize}/>

                <Select name="Price" onChange={handlePriceFilter} children={PRICE}
                        value={selectedPrice}/>
            </div>

            <button className="filters-reset" onClick={onResetFilters}>
                Reset Filters
            </button>
        </div>
    )
}

export const Filters = styled(FiltersContainer)`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-top: 80px;

    .filters-title {
        font-size: 24px;
        font-weight: 600;
    }

    .select-container {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }

    .filters-reset {
        margin: 30px 0 0 10px;
        font-size: 20px;
        width: 200px;
        height: 40px;
        color: white;
        background-color: #2C3333;
    }

    .filters-reset:hover {
        background-color: #dedede;
        color: #2C3333;
    }

    .filters-reset:active {
        background-color: #EA454C;
    }
`
