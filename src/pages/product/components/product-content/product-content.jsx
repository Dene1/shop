import styled from "styled-components"
import {Button, Icon} from "../../../../components"
import {useNavigate, useParams} from "react-router-dom"
import {FaStarHalfAlt} from "react-icons/fa";
import {SpecialPanel} from "../special-panel/special-panel.jsx"
import {FiHeart} from "react-icons/fi"

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

const ProductContentContainer = ({
                                     className,
                                     product: {
                                         id,
                                         title,
                                         imageUrl,
                                         price,
                                         size,
                                         description,
                                         brand,
                                         category,
                                         gender,
                                     },
                                 }) => {
    const navigate = useNavigate()
    const params = useParams()
    const path = `/product/${params.id}`
    const reviewsCount = 0

    return (
        <div className={className}>
            <div className="header-container">
                <button className="back" onClick={() => navigate(-1)}>Back</button>
                <span className="path-text">{path}</span>
            </div>
            <div className="product">
                <img src={imageUrl ? imageUrl : undefined} alt={title}/>
                <div className="product-info">
                    <div className="reviews"><FaStarHalfAlt size={18}/> {reviewsCount}
                        <span>Reviews</span></div>
                    <span className="title">{title}</span>

                    {category}
                    <div><span className="content-title">Price</span> <span
                        className="price">{price}$</span></div>
                    <div className="size">
                        <span className="content-title">Size</span>
                        {size.map((item) =>
                            <div className="size-container" key={item}>{item}</div>)}
                    </div>
                    <div className="buttons">
                        <FiHeart className="heart" size="26px"/>
                        <StyledButton> Add to cart</StyledButton>
                    </div>


                </div>
            </div>

            {/*<SpecialPanel*/}
            {/*    id={id}*/}
            {/*    margin="20px 0 20px"*/}
            {/*    editButton={*/}
            {/*        <Icon id="fa-pencil-square-o"*/}
            {/*              size="21px"*/}
            {/*              margin="0 10px 0 0"*/}
            {/*              onClick={() => navigate(`/product/${id}/edit`)}/>*/}
            {/*    }*/}
            {/*/>*/}
            <div className="product-description">
                <span className="description-title">Description</span>
                {description}
            </div>
        </div>
    )
}

export const ProductContent = styled(ProductContentContainer)`

    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 0 20px 0;
    }

    .product {
        display: flex;
        flex-direction: row;
        margin: 20px;
    }

    .heart {
        cursor: pointer;
        align-self: center;
        margin: 10px 0 0 0;

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

    .price {
        font-size: 30px;
        font-weight: 600;
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
