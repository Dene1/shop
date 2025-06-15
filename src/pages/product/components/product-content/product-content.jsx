import styled from "styled-components"
import {Button, Icon} from "../../../../components"
import {useNavigate, useParams} from "react-router-dom"
import {FaStarHalfAlt} from "react-icons/fa";
import {SpecialPanel} from "../special-panel/special-panel.jsx"
import {FiHeart} from "react-icons/fi"
import {FaPencilAlt} from "react-icons/fa";
import {useSelector} from "react-redux"
import {addCart} from "../../../../bff/api/add-cart.js"
import {selectUserId} from "../../../../selectors/index.js"
import {useState} from "react"

const StyledButton = styled(Button)`
    border: 1px solid #2C3333;
    background-color: #2C3333;
    color: white;
    width: 40%;
    height: 46px;

    &:hover {
        cursor: pointer;
        background-color: #dedede;
        color: #2C3333;
        border: 1px solid #5b6969;
    }
`

const StyledNotification = styled.p`
    text-transform: uppercase;
    text-align: center;
`

const ProductContentContainer = ({
                                     className,
                                     product: {
                                         id,
                                         title,
                                         imageUrl,
                                         price,
                                         size,
                                         description,
                                         category,
                                         reviews
                                     },
                                 }) => {
    const navigate = useNavigate()
    const params = useParams()
    const path = `${params.id}`
    const userid = useSelector(selectUserId)
    const [isOpen, setIsOpen] = useState(false)

    const getSizeArray = (sizeData) => {
        if (Array.isArray(sizeData)) {
            return [...sizeData].sort((a, b) => parseInt(a) - parseInt(b));
        } else if (typeof sizeData === "string") {
            return sizeData.sort((a, b) => parseInt(a) - parseInt(b)).split(",")
        } else {
            return [];
        }
    };

    const sizeArray = getSizeArray(size)

    const handleAddToCart = (productId) => {
        addCart(userid, productId, 1)
        setIsOpen(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    }

    return (
        <div className={className}>
            <div className="header-container">
                <button className="back"
                        onClick={() => navigate(-1)}
                >
                    Back
                </button>
                <span className="path-text">ID товара: {path}</span>

                <SpecialPanel
                    id={id}
                    margin=" 0 20px"
                    editButton={
                        <FaPencilAlt
                            size="21px"
                            margin="0 10px 0 0"
                            onClick={() => navigate(`/product/${id}/edit`)}
                        />
                    }
                />
            </div>
            <div className="product">
                <img src={imageUrl ? imageUrl : undefined}
                     alt={title}
                />
                {isOpen && (
                    <div className={isOpen ? "notification" : "notification-hidden"}>
                        <StyledNotification>Товар добавлен в корзину</StyledNotification>
                    </div>
                )}
                <div className="product-info">
                    <div className="reviews">
                        <FaStarHalfAlt size={18} />
                        {reviews.length}
                        <span>Reviews</span></div>
                    <span className="title">{title}</span>
                    {category}
                    <div className="price-container">
                        <div className="content-title">Price</div>
                        <div className="price">{price}$</div>
                    </div>
                    <div className="size">
                        <span className="content-title">Size</span>
                        {sizeArray.map((item) =>
                            <div className="size-container"
                                 key={item}
                            >
                                {item}
                            </div>)}
                    </div>
                    <div className="buttons">
                        <FiHeart className="heart"
                                 size="26px"
                        />
                        <StyledButton className="add-to-cart"
                                      onClick={() => handleAddToCart(id)}
                        >
                            Add to cart
                        </StyledButton>
                    </div>
                </div>
            </div>

            <div className="product-description">
                <span className="description-title">Description</span>
                <div className="description">{description}</div>
            </div>

        </div>
    )
}

export const ProductContent = styled(ProductContentContainer)`
    .notification {
        position: fixed;
        top: 20px;
        left: 84%;
        transform: translateX(-50%);
        width: 300px;
        font-size: 18px;
        background-color: #f0f0f0; /* Пример фона */
        padding: 8px 20px;
        border: 1px solid #EA454C;
        border-radius: 5px; /* Пример скругления углов */
        z-index: 20;
    }

    .notification-hidden {
        display: none;
    }

    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0 20px 0;
    }

    .product {
        display: flex;
        flex-direction: row;
        margin: 20px;
    }

    .heart {
        cursor: pointer;
        align-self: center;

        &:hover {
            fill: #EA454C;
            cursor: pointer;
            stroke: #5c656e;
        }
    }

    .description {
        padding-top: 20px;
        margin-inline: 40px;
        text-align: center;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 40px;
    }

    .product-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .title {
        font-size: 50px;
        font-weight: 600;
    }

    .back {
        border: 1px solid #dedede;
        color: #2C3333;
        width: 100px;
        height: 30px;
        cursor: pointer;
    }

    .content-title {
        font-size: 30px;
        font-weight: 600;
    }

    .description-title {
        font-size: 30px;
        font-weight: 600;
        text-align: center;
    }

    .reviews {
        display: flex;
        flex-direction: row;
        gap: 4px;
        align-items: center;
        font-size: 18px;
    }

    .price-container {
        display: flex;
        flex-direction: row;
        gap: 60px;
    }

    .price {
        font-size: 34px;
        font-weight: 600;
        color: #4e6173;
    }

    .size-container {
        border: 1px solid #2C3333;
        padding: 5px 10px;
        user-select: none;
        align-self: center;
    }

    .size-container:hover {
        cursor: pointer;
        background-color: #dedede;
    }

    .size-container:active {
        background-color: #EA454C;
        color: #fff;
    }

    .product-description {
        display: flex;
        flex-direction: column;
    }

    img {
        float: left;
        width: 800px;
        margin: 0 20px 10px 0;
    }

    .size {
        display: flex;
        flex-direction: row;
        gap: 5px 10px;
    }

    .product-description {
        font-size: 18px;
        white-space: pre-line;
    }
`
