import React from "react"
import { ProductCard } from "@/pages/catalog/components/product-card/product-card"
import { Pagination } from "@/pages/catalog/components/pagination/pagination"
import { ProductListContainer } from "@/pages/catalog/components/product-list/product-list.styles"

export const ProductList = ({ renderProducts, page, lastPage, setPage }) => {
    return (
        <ProductListContainer>
            <div className="product-list">
                {renderProducts.map(
                    ({
                        id,
                        title,
                        price,
                        category,
                        imageUrl,
                        brand,
                        size,
                        reviews,
                    }) => (
                        <ProductCard
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            size={size}
                            category={category}
                            imageUrl={imageUrl}
                            brand={brand}
                            reviewsCount={reviews.length}
                        />
                    ),
                )}
            </div>
            {lastPage > 1 && renderProducts.length > 0 && (
                <Pagination page={page} lastPage={lastPage} setPage={setPage} />
            )}
        </ProductListContainer>
    )
}
