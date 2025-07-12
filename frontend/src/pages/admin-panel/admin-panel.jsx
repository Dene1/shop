import { useDispatch, useSelector } from "react-redux"
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa"
import { CLOSE_MODAL, openModal, removeProductAsync } from "@actions"
import { Button, Input, Modal, sanitizeContent } from "@components"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { selectProducts } from "../../selectors"
import { addProductAsync } from "../../actions/index.js"

const AdminPanelContainer = ({ className }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const descriptionRef = useRef(null)
    const [imageUrlValue, setImageUrlValue] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const [priceValue, setPriceValue] = useState("")
    const [brandValue, setBrandValue] = useState("")
    const [categoryValue, setCategoryValue] = useState("")
    const [genderValue, setGenderValue] = useState("")
    const [sizeValue, setSizeValue] = useState("")
    const [modalText, setModalText] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const products = useSelector(selectProducts)

    const onImageChange = ({ target }) => setImageUrlValue(target.value)
    const onTitleChange = ({ target }) => setTitleValue(target.value)
    const onPriceChange = ({ target }) => setPriceValue(target.value)
    const onBrandChange = ({ target }) => setBrandValue(target.value)
    const onCategoryChange = ({ target }) => setCategoryValue(target.value)
    const onGenderChange = ({ target }) => setGenderValue(target.value)
    const onSizeChange = ({ target }) => setSizeValue(target.value)

    const onSave = () => {
        const newContent = sanitizeContent(descriptionRef.current.innerHTML)
        const resetForm = () => {
            setImageUrlValue("")
            setTitleValue("")
            setPriceValue("")
            setBrandValue("")
            setCategoryValue("")
            setGenderValue("")
            setSizeValue("")
            descriptionRef.current.innerHTML = ""
        }

        function isValidUrl(url) {
            try {
                new URL(url)
                return true
            } catch (e) {
                setModalText("Please enter a valid link")
                setIsOpen(true)
                setTimeout(() => {
                    setIsOpen(false)
                }, 2000)
                return false
            }
        }

        if (!isValidUrl(imageUrlValue)) {
            setModalText("Please enter a valid link")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        if (!titleValue) {
            setModalText("Please, enter the title")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        if (!priceValue) {
            setModalText("Please, enter the price")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        if (!brandValue) {
            setModalText("Please, enter the brand")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        if (!categoryValue) {
            setModalText("Please, enter the category")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        if (!genderValue) {
            setModalText("Please, enter the gender")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        if (!sizeValue) {
            setModalText("Please, enter the size")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        const numberFunction = (sizeValue) => {
            const sizes = sizeValue.split(",")

            for (const size of sizes) {
                const trimmedSize = size.trim()

                if (trimmedSize === "") {
                    return false
                }

                if (isNaN(Number(trimmedSize))) {
                    return false
                }
            }
            return true
        }

        if (numberFunction(priceValue) === false) {
            setModalText("Please enter a number in the price field")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        if (numberFunction(sizeValue) === false) {
            setModalText("Please enter a number in the size field")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        function sortSizes(str) {
            return str
                .split(",")
                .map(Number)
                .sort((a, b) => a - b)
        }

        const sizeValueArr = sortSizes(sizeValue)

        dispatch(
            addProductAsync({
                title: titleValue,
                image_url: imageUrlValue,
                price: priceValue,
                brand: brandValue,
                category: categoryValue,
                size: sizeValueArr,
                gender: genderValue,
                description: newContent,
            }),
        )

        setIsOpen(true)
        setModalText("Product added")
        setTimeout(() => {
            setIsOpen(false)
        }, 2000)

        resetForm()
    }

    const onPostRemove = (id) => {
        dispatch(
            openModal({
                text: "Delete product?",
                onConfirm: () => {
                    setModalText("Product deleted")
                    setIsOpen(true)
                    setTimeout(() => {
                        setIsOpen(false)
                    }, 2000)
                    dispatch(removeProductAsync(id))
                    dispatch(CLOSE_MODAL)
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        )
    }

    return (
        <div className={className}>
            {isOpen && <Modal text={modalText} />}
            <h1>Admin panel</h1>
            <div className="container">
                <div className="add-product">
                    <div className="add-product-form">
                        <h2>Add product</h2>
                        <div>
                            <Input
                                value={titleValue}
                                placeholder="Title"
                                onChange={onTitleChange}
                            />

                            <Input
                                value={imageUrlValue}
                                placeholder="Photo"
                                onChange={onImageChange}
                            />

                            <Input
                                value={categoryValue}
                                placeholder="Category"
                                onChange={onCategoryChange}
                            />

                            <Input
                                value={genderValue}
                                placeholder="Gender"
                                onChange={onGenderChange}
                            />

                            <Input
                                value={priceValue}
                                placeholder="Price"
                                onChange={onPriceChange}
                            />

                            <Input
                                value={brandValue}
                                placeholder="Brand"
                                onChange={onBrandChange}
                            />

                            <Input
                                value={sizeValue}
                                placeholder="Size"
                                onChange={onSizeChange}
                            />

                            <div
                                ref={descriptionRef}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                className="product-text"
                                placeholder="Description"
                            ></div>
                        </div>
                        <Button onClick={onSave}>ADD</Button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>photo</th>
                            <th>category</th>
                            <th>gender</th>
                            <th>price</th>
                            <th>brand</th>
                            <th>size</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td className="product-title">
                                    {product.title}
                                </td>
                                <td>{product.imageUrl}</td>
                                <td>{product.category}</td>
                                <td>{product.gender}</td>
                                <td>{product.price}</td>
                                <td>{product.brand}</td>
                                <td>{product.size.join(",")}</td>
                                <td>
                                    <button>
                                        <FaPencilAlt
                                            size="24px"
                                            onClick={() =>
                                                navigate(
                                                    `/product/${product.id}/edit`,
                                                )
                                            }
                                        />
                                    </button>
                                    <button>
                                        <FaRegTrashAlt
                                            size="24px"
                                            onClick={() =>
                                                onPostRemove(product.id)
                                            }
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const AdminPanel = styled(AdminPanelContainer)`
    margin: 0 20px;

    .container {
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }

    .add-product {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 30%;
        border: 1px solid #405060;
    }

    .add-product-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    h1 {
        text-align: center;
    }

    table {
        width: 50%;
        border-collapse: collapse;
    }

    th {
        text-transform: uppercase;
    }

    th,
    td {
        border: 1px solid black;
        padding: 4px;
        text-align: center;
    }

    td:first-child {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    td:not(:first-child) {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    td button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .product-text {
        min-height: 80px;
        border: 1px solid black;
        font-size: 18px;
        white-space: pre-line;
    }

    .edit-panel button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
`
