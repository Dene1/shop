import React, {useEffect, useMemo, useState} from "react"
import {useServerRequest} from "../../hooks/index.js"
import {debounce, getLastPageFromLinks} from "./utils/index.js"
import {PAGINATION_LIMIT} from "../../constants/index.js"
import {Filters, Pagination, ProductList} from "./components/index.js"
import {Search} from "../../components/header/components/index.js"
import {Loader} from "../../components/index.js"
import styled from "styled-components"
import {FILTER_CATALOG, Select} from "./components/filters/components/index.js"

const CatalogContainer = ({className}) => {
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
    const requestServer = useServerRequest()

    useEffect(() => {
        setIsLoading(true)
        requestServer("fetchProducts", searchPhrase, page, PAGINATION_LIMIT)
            .then(({res: {products, links}}) => {
                setProducts(products);
                setLastPage(getLastPageFromLinks(links));
            })
            .finally(() => setIsLoading(false))
    }, [requestServer, page, shouldSearch]);

    const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 500), [])

    const onSearch = ({target}) => {
        setSearchPhrase(target.value)
        startDelayedSearch(!shouldSearch)
    }

    const handleGenderFilter = (gender) => setSelectedGender(gender)
    const handleBrandFilter = (brand) => setSelectedBrand(brand)
    const handleSizeFilter = (size) => setSelectedSize(size)
    const handlePriceFilter = (price) => setSelectedPrice(price)
    const handleFilterChange = (event) => setFilter(event.target.value)

    const renderProducts = useMemo(() => {
        let filteredProducts = [...products];

        if (selectedGender && selectedGender !== "Unisex") {
            filteredProducts = filteredProducts.filter(product => product.gender === selectedGender);
        }

        if (selectedBrand && selectedBrand !== "All") {
            filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
        }

        if (selectedSize && selectedSize !== "All") {
            filteredProducts = filteredProducts.filter(product => product.size.includes(selectedSize))
        }

        if (filter && filter !== FILTER_CATALOG[0]) {
            if (filter === FILTER_CATALOG[1]) {
                filteredProducts = filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            } else if (filter === FILTER_CATALOG[2]) {
                filteredProducts = filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }
        }

        if (selectedPrice && selectedPrice !== "All") {
            const {minPrice, maxPrice} = selectedPrice;
            filteredProducts = filteredProducts.filter(product => {
                const productPrice = parseFloat(product.price);
                return productPrice >= minPrice && productPrice <= maxPrice;
            });
        }
        return filteredProducts;
    }, [products, selectedGender, selectedBrand, selectedSize, filter, selectedPrice]);

    const onResetFilters = () => {
        setSelectedGender("Unisex");
        setSelectedBrand("All");
        setSelectedSize("All");
        setSelectedPrice("All");
    }

    if (!renderProducts || renderProducts.length === 0) {
        return <div className="no-posts-found">Продукции не найдено</div>;
    }

    return (
        <div className={className}>
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
                    <Select onChange={handleFilterChange}
                            children={FILTER_CATALOG}
                            value={filter}/>
                    <Search onChange={onSearch} searchPhrase={searchPhrase}/>
                </div>
                <ProductList
                    renderProducts={renderProducts}
                    page={page}
                    setPage={setPage}
                    lastPage={lastPage}/>
            </div>
        </div>
    )
}

export const Catalog = styled(CatalogContainer)`
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 18px;
    margin: 20px;

    .sort {
        margin-left: 60px;
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 240px;
        align-items: flex-end;
    }

    .no-posts-found {
        text-align: center;
        margin: 20px 0 0 40px;
        font-size: 24px;
        font-weight: 600;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`
