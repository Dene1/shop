import { Button, Input, Modal } from "@/components"
import { SpecialPanel } from "@/pages/product/components"
import { useLayoutEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { saveProductAsync } from "@/actions"
import { selectUserRole } from "@/selectors"
import { FaRegSave } from "react-icons/fa"
import { TiDocumentDelete } from "react-icons/ti"
import { ROLE } from "@/constants"
import {
    Container,
    ProductFormContainer,
    StyledSpan,
} from "@/pages/catalog/components/product-form/product-form.styles"
import { sanitizeContent } from "@/utils/sanitize-content"

export const ProductForm = ({
    product: { id, title, imageUrl, price, size, description },
}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
    const [titleValue, setTitleValue] = useState(title)
    const [priceValue, setPriceValue] = useState(price)
    const [isOpen, setIsOpen] = useState(false)
    const userRole = useSelector(selectUserRole)
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
        dispatch(
            saveProductAsync(id, {
                image_url: imageUrlValue,
                title: titleValue,
                price: priceValue,
                size: sizeValue,
                description: newContent,
            }),
        ).then(({ id }) => navigate(`/product/${id}`))
        setIsOpen(true)
        setTimeout(() => {
            setIsOpen(false)
        }, 2000)
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

    if (userRole !== ROLE.ADMIN && userRole !== ROLE.MODERATOR) {
        return (
            <Container>
                You must enter the system to create or change the post.
                <br />
                Please <Link to="/login">Sign in.</Link>
            </Container>
        )
    }

    return (
        <ProductFormContainer>
            {isOpen && <Modal text={"Product saved"} />}
            <div className="edit-panel">
                <h1>Change the product</h1>
                <SpecialPanel
                    id={id}
                    editButton={<FaRegSave size="30px" onClick={onSave} />}
                />
            </div>

            <StyledSpan>Picture</StyledSpan>
            <Input
                value={imageUrlValue}
                placeholder="Image URL"
                onChange={onImageChange}
            />
            <StyledSpan>Title</StyledSpan>
            <Input
                value={titleValue}
                placeholder="Heading"
                onChange={onTitleChange}
            />

            <StyledSpan>Price</StyledSpan>
            <Input
                value={priceValue}
                placeholder="Price"
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
        </ProductFormContainer>
    )
}
