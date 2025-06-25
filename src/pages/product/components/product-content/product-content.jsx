import styled from "styled-components"
import { Button, Modal } from "../../../../components"
import { useNavigate, useParams } from "react-router-dom"
import { FaPencilAlt, FaStarHalfAlt } from "react-icons/fa"
import { SpecialPanel } from "../special-panel/special-panel.jsx"
import { FiHeart } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import {
    selectProduct,
    selectUserId,
    selectUserSession
} from "../../../../selectors/index.js"
import { useState } from "react"
import { addCartAsync } from "../../../../actions/index.js"
import { useServerRequest } from "../../../../hooks/index.js"
import { nanoid } from "nanoid"

const ProductContentContainer = ({
                                     className,

                                 }) => {
    const navigate = useNavigate()
    const params = useParams()
    const path = `${ params.id }`
    const userId = useSelector(selectUserId)
    const sessionUserId = useSelector(selectUserSession)
    const [selectedSize, setSelectedSize] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [modalText, setModalText] = useState("")
    const requestServer = useServerRequest()
    const dispatch = useDispatch()
    const product = useSelector(selectProduct)
    console.log(product)

    const getSizeArray = (sizeData) => {
        if (Array.isArray(sizeData)) {
            return [...sizeData].sort((a, b) => parseInt(a) - parseInt(b))
        } else if (typeof sizeData === "string") {
            return sizeData.sort((a, b) => parseInt(a) - parseInt(b)).split(",")
        } else {
            return []
        }
    }

    const sizeArray = getSizeArray(product.size)

    const handleAddToCart = (productId) => {
        if (selectedSize === null) {
            setModalText("Выберите размер")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        if (sessionUserId === null) {
            setModalText("Сначала авторизуйтесь")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        const generateId = () => {
            return nanoid()
        }
        const myId = generateId()
        const cartItemId = `${ productId }-${ myId }`

        dispatch(addCartAsync(requestServer, cartItemId, userId, productId, selectedSize, 1))
        setModalText("Товар добавлен в корзину")
        setIsOpen(true)
        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }

    const handleSizeClick = (size) => {
        setSelectedSize(size)
    }

    return (
        <div className={ className }>
            { isOpen && <Modal text={ modalText } /> }
            <div className="header-container">
                <button className="back"
                        onClick={ () => navigate(-1) }
                >
                    Back
                </button>
                <span className="path-text">ID товара: { path }</span>

                <SpecialPanel
                    id={ product.id }
                    margin=" 0 20px"
                    editButton={
                        <FaPencilAlt
                            size="21px"
                            margin="0 10px 0 0"
                            onClick={ () => navigate(`/product/${ product.id }/edit`) }
                        />
                    }
                />
            </div>
            <div className="product">
                <img src={ product.imageUrl ? product.imageUrl : undefined }
                     alt={ product.title }
                />
                <div className="product-info">
                    <div className="reviews">
                        <FaStarHalfAlt size={ 18 } />
                        { product.reviews.length }
                        <span>Reviews</span>
                    </div>
                    <h1>{ product.title }</h1>
                    { product.category }
                    <div className="price-container">
                        <div className="content-title">PRICE</div>
                        <div className="price">{ product.price }$</div>
                    </div>
                    <div className="sizes">
                        <div className="content-title">SIZE</div>
                        <div className="size-items">
                            { sizeArray.map((item) =>
                                <div className={ `size-container ${ selectedSize === item ? "selected" : "" }` }
                                     key={ item }
                                     onClick={ () => handleSizeClick(item) }
                                >
                                    { item }
                                </div>) }
                        </div>
                    </div>
                    <div className="buttons">
                        <FiHeart className="heart"
                                 size="26px"
                        />
                        <Button width="40%"
                                onClick={ () => handleAddToCart(product.id) }
                        >
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>

            <div className="product-description">
                <h1>DESCRIPTION</h1>
                <div className="description">{ product.description }</div>
            </div>
        </div>
    )
}

export const ProductContent = styled(ProductContentContainer)`
    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 24px 60px;
    }

    .sizes {
        display: flex;
        flex-direction: row;
        gap: 50px;
    }

    .size-container {
        cursor: pointer;
        padding: 5px;
        border: 1px solid #ccc;
        margin-right: 5px;

    }

    .size-container.selected {
        background-color: #EA454C;
        color: white;
    }

    .selected-size {
        margin-top: 10px;
        font-weight: bold;
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

    .product-title {
    }

    .back {
        border: 1px solid #dedede;
        color: #2C3333;
        width: 100px;
        height: 30px;
        cursor: pointer;
        font-size: 18px;
    }

    .content-title {
        font-size: 30px;
        font-weight: 600;
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
        font-size: 54px;
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
        align-items: center;
    }

    img {
        float: left;
        width: 800px;
        margin: 0 20px 10px 0;
    }

    .size-items {
        display: flex;
        flex-direction: row;
        gap: 5px 10px;
    }

    .product-description {
        font-size: 18px;
        white-space: pre-line;
    }
`
