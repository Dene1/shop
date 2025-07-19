import { useDispatch } from "react-redux"
import { addProductAsync } from "@/actions"
import { Button, Input, Modal } from "@/components"
import { useRef, useState } from "react"
import { AdminPanelContainer } from "@/pages/admin-panel/admin-panel.styles"
import { sanitizeContent } from "@/utils/sanitize-content"
import { ProductTable } from "@/pages/admin-panel/components/product-table"
import { useModal } from "@/pages/admin-panel/utils/hooks"

export const AdminPanel = () => {
    const dispatch = useDispatch()
    const descriptionRef = useRef(null)
    const [imageUrlValue, setImageUrlValue] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const [priceValue, setPriceValue] = useState("")
    const [brandValue, setBrandValue] = useState("")
    const [categoryValue, setCategoryValue] = useState("")
    const [genderValue, setGenderValue] = useState("")
    const [sizeValue, setSizeValue] = useState("")
    const { isOpen, modalText, showModal } = useModal()

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
                showModal("Please enter a valid link")
                return false
            }
        }

        if (!isValidUrl(imageUrlValue)) {
            showModal("Please enter a valid link")
            return
        }

        if (!titleValue) {
            showModal("Please, enter the title")
            return
        }

        if (!priceValue) {
            showModal("Please, enter the price")
            return
        }

        if (!brandValue) {
            showModal("Please, enter the brand")
            return
        }

        if (!categoryValue) {
            showModal("Please, enter the category")
            return
        }

        if (!genderValue) {
            showModal("Please, enter the gender")
            return
        }

        if (!sizeValue) {
            showModal("Please, enter the size")
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
            showModal("Please enter a number in the price field")
            return
        }

        if (numberFunction(sizeValue) === false) {
            showModal("Please enter a number in the size field")
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

        showModal("Product added")
        resetForm()
    }

    return (
        <AdminPanelContainer>
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
                <ProductTable />
            </div>
        </AdminPanelContainer>
    )
}
