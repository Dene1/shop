import { Button, Input, sanitizeContent } from "@components"
import { SpecialPanel } from "@pages/product/components"
import { useLayoutEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { saveProductAsync } from "@actions"
import { useServerRequest } from "@/hooks"
import { selectUserSession } from "@selectors"
import { FaRegSave } from "react-icons/fa"
import { TiDocumentDelete } from "react-icons/ti"
import styled from "styled-components"

const Container = styled.div`
    text-align: center;
    font-size: 24px;

    a:link {
        cursor: pointer;
        text-decoration: underline;
    }

    a:link:hover {
        text-decoration: none;
        opacity: 0.8;
    }
`

const StyledSpan = styled.span`
    font-size: 20px;
    font-weight: 600;
`

const ProductFormContainer = ({
    className,
    product: { id, title, imageUrl, price, size, publishedAt, description },
}) => {
    const session = useSelector(selectUserSession)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const requestServer = useServerRequest()
    const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
    const [titleValue, setTitleValue] = useState(title)
    const [priceValue, setPriceValue] = useState(price)
    const descriptionRef = useRef(null)

    const getSizeArray = (sizeData) => {
        if (Array.isArray(sizeData)) {
            return sizeData
        } else if (typeof sizeData === "string") {
            return sizeData.split(",")
        } else {
            return []
        }
    }

    const sortSizes = (sizes) => {
        return [...sizes].sort((a, b) => parseInt(a) - parseInt(b))
    }

    const [sizeValue, setSizeValue] = useState(() => {
        const initialSizes = getSizeArray(size)
        return sortSizes(initialSizes)
    })

    useLayoutEffect(() => {
        setImageUrlValue(imageUrl)
        setTitleValue(title)
    }, [imageUrl, title])

    const onSave = () => {
        const newContent = sanitizeContent(descriptionRef.current.innerHTML)
        console.log(imageUrlValue)

        dispatch(
            saveProductAsync(requestServer, {
                id,
                imageUrl: imageUrlValue,
                title: titleValue,
                price: priceValue,
                size: sizeValue,
                content: newContent,
            }),
        ).then(({ id }) => navigate(`/product/${id}`))
    }

    const onImageChange = ({ target }) => setImageUrlValue(target.value)
    const onTitleChange = ({ target }) => setTitleValue(target.value)
    const onPriceChange = ({ target }) => setPriceValue(target.value)
    const addSize = () => setSizeValue([...sizeValue, ""])

    const removeSize = (index) => {
        const newSizes = [...sizeValue]
        newSizes.splice(index, 1)
        setSizeValue(newSizes)
    }

    const updateSize = (index, newSize) => {
        const newSizes = [...sizeValue]
        newSizes[index] = newSize
        setSizeValue(newSizes)
    }

    if (!session) {
        return (
            <Container>
                Вы должны войти в систему, чтобы создать или изменить пост.
                <br />
                Пожалуйста <Link to="/login">Войдите.</Link>
            </Container>
        )
    }

    return (
        <div className={className}>
            <div className="edit-panel">
                <h1>Изменить карточку</h1>
                <SpecialPanel
                    id={id}
                    publishedAt={publishedAt}
                    editButton={<FaRegSave size="30px" onClick={onSave} />}
                />
            </div>

            <StyledSpan>Picture</StyledSpan>
            <Input
                value={imageUrlValue}
                placeholder="Изображение"
                onChange={onImageChange}
            />
            <StyledSpan>Title</StyledSpan>
            <Input
                value={titleValue}
                placeholder="Заголовок"
                onChange={onTitleChange}
            />

            <StyledSpan>Price</StyledSpan>
            <Input
                value={priceValue}
                placeholder="Цена"
                onChange={onPriceChange}
            />

            <StyledSpan>Size</StyledSpan>
            <div className="size-container">
                {sizeValue.map((size, index) => (
                    <div className="container" key={index}>
                        <Input
                            type="text"
                            value={size}
                            placeholder="Размер"
                            onChange={(e) => updateSize(index, e.target.value)}
                        />
                        <TiDocumentDelete
                            className="delete"
                            type="button"
                            size="36px"
                            onClick={() => removeSize(index)}
                        ></TiDocumentDelete>
                    </div>
                ))}
                <Button type="button" onClick={addSize}>
                    Add size
                </Button>
            </div>

            <div className="description">
                <StyledSpan>Description</StyledSpan>
                <div
                    ref={descriptionRef}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="post-text"
                >
                    {description}
                </div>
            </div>
        </div>
    )
}

export const ProductForm = styled(ProductFormContainer)`
    margin: 0 100px;

    .edit-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .description {
        margin-top: 20px;
    }

    .size-container {
        display: grid;
        grid-template-columns: repeat(9, 0.2fr);
        gap: 14px;
    }

    .container {
        display: flex;
        flex-direction: row;
    }

    .delete {
        cursor: pointer;
    }

    .btn-add {
        cursor: pointer;
        height: 40px;
        width: 98px;
    }

    img {
        float: left;
        margin: 0 20px 10px 0;
    }

    .post-text {
        min-height: 80px;
        border: 1px solid black;
        font-size: 18px;
        white-space: pre-line;
        padding: 10px 10px;
    }
`
