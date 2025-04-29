import {Link} from "react-router-dom"
import {FiHeart} from "react-icons/fi";
import {FaStar} from "react-icons/fa";
import styled from "styled-components"

const ProductCardContainer = ({
                                  className,
                                  id,
                                  title,
                                  price,
                                  category,
                                  brand,
                                  imageUrl,
                                  reviewsCount
                              }) => {
    return (
        <div className={className}>
            <Link to={`/product/${id}`}>
                <FiHeart className="qwe" size="26px"/>
                <img src={imageUrl ? imageUrl : undefined} alt={title}/>
                <div className="product-card-footer">
                    <div className="product-card--price">{price}$</div>
                    <div className="product-card--title">{title}</div>

                    <div>{category}</div>
                    <div className="reviews-count">
                        <div>{brand}</div>
                        <div className="rating">
                            <FaStar style={{fill: "#dca109"}} size="18px"/> 0.0
                            ({reviewsCount})
                        </div>

                    </div>
                    <div className="product-card-buttons">
                        <button className="add-to-cart">add to cart</button>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export const ProductCard = styled(ProductCardContainer)`
    display: flex;
    flex-direction: column;
    width: 300px;
    border: 1px solid black;
    position: relative;

    .qwe {
        cursor: pointer;
        position: absolute;
        top: 10px;
        left: 10px;
    }

    .qwe:hover {
        fill: #EA454C;
    }

    .qwe:active {
        opacity: 0.2;
    }

    .product-card--price {
        font-size: 24px;
        font-weight: 600;
        color: #5c656e;
    }

    .product-card--title {
        font-size: 22px;
        font-weight: 600;
        text-align: center;
    }

    .add-to-favorites {
        width: 40px;
        height: 40px;
        background-color: transparent;
        cursor: pointer;
        align-items: center;
    }

    .add-to-favorites:hover {
        color: white;
        background-color: #EA454C;
        border: none;
    }

    .add-to-cart {
        width: 120px;
        height: 40px;
        border: 1px solid black;
        color: white;
        background-color: #2C3333;
        cursor: pointer;
        text-transform: uppercase;
    }

    .add-to-cart:hover {
        background-color: #dedede;
        color: #2C3333;
        border: 1px solid #2C3333;
    }

    img {
        display: block;
        width: 100%;
        height: 260px;
    }

    .product-card-footer {
        padding: 5px;
        border-top: 1px solid black;
    }

    .product-card-buttons {
        display: flex;
        justify-content: center;
        margin-top: 3px;
        gap: 20px;
        align-items: center;
    }

    .rating {
        display: flex;
        align-items: center;
    }

    .reviews-count {
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        gap: 5px;
        align-items: center;
    }
`
