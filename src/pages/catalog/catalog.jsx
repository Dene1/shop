import styled from "styled-components"
import {useEffect, useMemo, useState} from "react"
import {useServerRequest} from "../../hooks/index.js"
import {debounce, getLastPageFromLinks} from "./utils/index.js"
import {PAGINATION_LIMIT} from "../../constants/index.js"
import {Filters, Pagination, ProductCard} from "./components/index.js"
import {Search} from "../../components/header/components/index.js"

const CatalogContainer = ({className}) => {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [searchPhrase, setSearchPhrase] = useState("")
    const [shouldSearch, setShouldSearch] = useState(false)
    const [selectedGender, setSelectedGender] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedPrice, setSelectedPrice] = useState("")
    const requestServer = useServerRequest()

    useEffect(() => {
        requestServer("fetchProducts", searchPhrase, page, PAGINATION_LIMIT)
            .then(({res: {products, links}}) => {
                setProducts(products);
                setLastPage(getLastPageFromLinks(links));
            })
    }, [requestServer, page, shouldSearch,]);

    const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

    const onSearch = ({target}) => {
        setSearchPhrase(target.value)
        startDelayedSearch(!shouldSearch)
    }

    const handleGenderFilter = (gender) => {
        setSelectedGender(gender)
    }

    const handleBrandFilter = (brand) => {
        setSelectedBrand(brand);
    };

    const handleSizeFilter = (size) => {
        setSelectedSize(size);
    };

    const handlePriceFilter = (price) => {
        setSelectedPrice(price);
    };

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

        if (selectedPrice && selectedPrice !== "All") {
            const {minPrice, maxPrice} = selectedPrice;
            filteredProducts = filteredProducts.filter(product => {
                const productPrice = parseFloat(product.price);
                return productPrice >= minPrice && productPrice <= maxPrice;
            });
        }
        return filteredProducts;
    }, [products, selectedGender, selectedBrand, selectedSize, selectedPrice]);

    const onResetFilters = () => {
        setSelectedGender("Unisex");
        setSelectedBrand("All");
        setSelectedSize("All");
        setSelectedPrice("All");
    }

    // console.log(selectedGender, selectedBrand, selectedSize, selectedPrice)

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
                    <select className="sort-select">
                        <option value="default">По умолчанию</option>
                        <option value="name-a">По названию</option>
                        <option value="price-high">По возрастанию цены</option>
                        <option value="price-low">По убыванию цены</option>
                    </select>
                    <Search onChange={onSearch} searchPhrase={searchPhrase}/>
                </div>

                {renderProducts.length > 0 ? (
                    <div className="products">
                        <div className="product-list">
                            {renderProducts.map(({
                                                     id,
                                                     title,
                                                     price,
                                                     category,
                                                     imageUrl,
                                                     brand,
                                                     reviewsCount
                                                 }) =>
                                <ProductCard key={id}
                                             id={id}
                                             title={title}
                                             price={price}
                                             category={category}
                                             imageUrl={imageUrl}
                                             brand={brand}
                                             reviewsCount={reviewsCount}
                                />)}
                        </div>
                    </div>) : (
                    <div className="no-posts-found">Продукции не найдено</div>)}
            </div>
            {lastPage > 1 && renderProducts.length > 0 && (
                <Pagination page={page} lastPage={lastPage} setPage={setPage}/>
            )}
        </div>
    )
}

export const Catalog = styled(CatalogContainer)`
    display: flex;
    flex-direction: row;
    font-size: 18px;
    margin: 20px;

    .products {
        margin: 20px;
        display: flex;
        flex-direction: row;
    }

    .sort {
        margin-left: 60px;
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 240px;
        align-items: flex-end;
    }

    .sort-select {
        height: 20px;
        width: 160px;
    }

    .product-list {
        display: grid;
        align-items: center;
        margin: 20px 0 0 40px;
        grid-template-columns: repeat(3, 1fr);
        gap: 60px;
    }

    .no-posts-found {
        text-align: center;
        margin: 20px 0 0 40px;
        font-size: 24px;
        font-weight: 600;

    }
`
