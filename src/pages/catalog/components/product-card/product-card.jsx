import {Link} from "react-router-dom"
import {FiHeart} from "react-icons/fi";
import {FaStar} from "react-icons/fa";
import styled from "styled-components"
import {addToCart} from "../../../../actions/index.js"
import {useDispatch} from "react-redux"

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
    const dispatch = useDispatch()

    const handleAddToCart = (id) => dispatch(addToCart(id))

    return (
        <div className={className}>
            <FiHeart className="favorite"
                     size="26px"
            />
            <Link to={`/product/${id}`}>
                <img src={imageUrl ? imageUrl : undefined}
                     alt={title}
                />

                <div className="product-card-footer">
                    <div className="product-card--title">{title}</div>
                    <div className="product-card--price">{price}$</div>

                    <div>{category}</div>
                    <div className="reviews-count">
                        <div>{brand}</div>
                        <div className="rating">
                            <FaStar style={{fill: "#dca109"}}
                                    size="18px"
                            />
                            0.0 ({reviewsCount})
                        </div>
                    </div>

                    <div className="product-card-buttons">
                        <button className="add-to-cart"
                                onClick={(e) => {
                                    handleAddToCart(id);
                                    e.stopPropagation();
                                }}
                        >add to cart
                        </button>
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
    border: 1px solid #2C3333;
    position: relative;

    .favorite {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;

        &:hover {
            fill: #EA454C;
            cursor: pointer;
            stroke: #5c656e;
        }
    }

    .product-card--price {
        font-size: 24px;
        font-weight: 600;
        color: #5c656e;
        margin-top: auto;
    }

    .product-card--title {
        font-size: 22px;
        font-weight: 600;
        text-align: center;
        height: 2.2em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-to-cart {
        width: 120px;
        height: 40px;
        border: 1px solid #2C3333;
        color: white;
        background-color: #2C3333;
        text-transform: uppercase;

        &:hover {
            background-color: #dedede;
            color: #2C3333;
            border: 1px solid #2C3333;
            cursor: pointer;
        }

        &:active {
            background-color: #EA454C;
            color: #dedede;
        }
    }

    img {
        display: block;
        width: 100%;
        height: 260px;
    }

    .product-card-footer {
        padding: 5px;
        border-top: 1px solid #2C3333;
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
