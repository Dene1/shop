import { useEffect, useMemo, useState } from "react"
import { debounce } from "./utils"
import { PAGINATION_LIMIT } from "@/constants"
import { Filters, ProductList } from "./components"
import { Search } from "@/components/header/components"
import { Loader } from "@/components"
import { FILTER_CATALOG, Select } from "./components/filters/components"
import { request } from "@/utils/request"
import { CatalogContainer } from "@/pages/catalog/catalog.styles"

export const Catalog = () => {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [searchPhrase, setSearchPhrase] = useState("")
    const [shouldSearch, setShouldSearch] = useState(false)
    const [selectedGender, setSelectedGender] = useState("Unisex")
    const [selectedBrand, setSelectedBrand] = useState("All")
    const [selectedSize, setSelectedSize] = useState("All")
    const [selectedPrice, setSelectedPrice] = useState("All")
    const [filter, setFilter] = useState(FILTER_CATALOG[0])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            request(
                `/products?searchPhrase=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
            ).then(({ data: { products, lastPage } }) => {
                setProducts(products)
                setLastPage(lastPage)
                setIsLoading(false)
            })
        }, 1000)
    }, [page, shouldSearch])

    const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 500), [])

    const onSearch = ({ target }) => {
        setSearchPhrase(target.value)
        startDelayedSearch(!shouldSearch)
    }

    const handleGenderFilter = (gender) => setSelectedGender(gender)
    const handleBrandFilter = (brand) => setSelectedBrand(brand)
    const handleSizeFilter = (size) => setSelectedSize(size)
    const handlePriceFilter = (price) => setSelectedPrice(price)
    const handleFilterChange = (event) => setFilter(event.target.value)

    function filterProductsByPrice(products, selectedPrice) {
        if (selectedPrice === "All") {
            return products
        }
        if (selectedPrice === "$10000+") {
            return products.filter(
                (product) => parseFloat(product.price) >= 10000,
            )
        }

        const priceRange = selectedPrice.replace(/\$/g, "").trim() // Удаляем $
        const [min, max] = priceRange.split(" - ")
        const minPrice = parseFloat(min)
        const maxPrice = parseFloat(max)

        return products.filter((product) => {
            const productPrice = parseFloat(product.price)
            return productPrice >= minPrice && productPrice <= maxPrice
        })
    }

    const renderProducts = useMemo(() => {
        let filteredProducts = [...products]

        if (selectedGender && selectedGender !== "Unisex") {
            filteredProducts = filteredProducts.filter(
                (product) => product.gender === selectedGender,
            )
        }

        if (selectedBrand && selectedBrand !== "All") {
            filteredProducts = filteredProducts.filter(
                (product) => product.brand === selectedBrand,
            )
        }

        if (selectedSize && selectedSize !== "All") {
            filteredProducts = filteredProducts.filter((product) =>
                product.size.includes(selectedSize),
            )
        }
        filteredProducts = filterProductsByPrice(
            filteredProducts,
            selectedPrice,
        )

        if (filter === FILTER_CATALOG[1]) {
            return filteredProducts.sort((a, b) => a.price - b.price)
        } else if (filter === FILTER_CATALOG[2]) {
            return filteredProducts.sort((a, b) => b.price - a.price)
        } else if (filter === FILTER_CATALOG[0]) {
            return filteredProducts
        }
        return filteredProducts
    }, [
        products,
        filter,
        selectedGender,
        selectedBrand,
        selectedSize,
        selectedPrice,
    ])

    const onResetFilters = () => {
        setSelectedGender("Unisex")
        setSelectedBrand("All")
        setSelectedSize("All")
        setSelectedPrice("All")
    }

    return (
        <CatalogContainer>
            <Filters
                onBrandFilter={handleBrandFilter}
                onSizeFilter={handleSizeFilter}
                onPriceFilter={handlePriceFilter}
                onGenderFilter={handleGenderFilter}
                onResetFilters={onResetFilters}
                selectedPrice={selectedPrice}
                selectedBrand={selectedBrand}
                selectedSize={selectedSize}
                selectedGender={selectedGender}
            />
            <div className="posts-and-search">
                <div className="sort">
                    <Select
                        onChange={handleFilterChange}
                        children={FILTER_CATALOG}
                        value={filter}
                    />
                    <Search onChange={onSearch} searchPhrase={searchPhrase} />
                </div>
                {isLoading ? (
                    <Loader isLoading={isLoading} />
                ) : !renderProducts || renderProducts.length === 0 ? (
                    <div className="no-posts-found">Products not found</div>
                ) : (
                    <ProductList
                        renderProducts={renderProducts}
                        page={page}
                        setPage={setPage}
                        lastPage={lastPage}
                    />
                )}
            </div>
        </CatalogContainer>
    )
}
