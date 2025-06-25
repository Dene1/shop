import React from "react";
import { ProductCard } from "../product-card/product-card.jsx"
import { Pagination } from "../pagination/pagination.jsx"
import styled from "styled-components"

export const ProductListContainer = ({
                                         className,
                                         renderProducts,
                                         page,
                                         lastPage,
                                         setPage,
                                     }) => {

    return (
        <div className={ className }>
            <div className="product-list">
                { renderProducts.map(({
                                          id,
                                          title,
                                          price,
                                          category,
                                          imageUrl,
                                          brand,
                                          size,
                                          reviewsCount
                                      }) => (
                    <ProductCard
                        key={ id }
                        id={ id }
                        title={ title }
                        price={ price }
                        size={ size }
                        category={ category }
                        imageUrl={ imageUrl }
                        brand={ brand }
                        reviewsCount={ reviewsCount }
                    />
                )) }
            </div>
            { lastPage > 1 && renderProducts.length > 0 && (
                <Pagination page={ page }
                            lastPage={ lastPage }
                            setPage={ setPage }
                />
            ) }
        </div>
    );
};

export const ProductList = styled(ProductListContainer)`
    margin: 20px;
    display: flex;
    flex-direction: row;

    .product-list {
        display: grid;
        align-items: stretch;
        margin: 20px 0 0 40px;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
    }
`
