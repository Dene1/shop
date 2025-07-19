import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa"
import { CLOSE_MODAL, openModal, removeProductAsync } from "@/actions"
import { selectProducts } from "@/selectors"
import { useModal } from "@/pages/admin-panel/utils/hooks"

export const ProductTable = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector(selectProducts)
    const { showModal } = useModal()

    const onPostRemove = (id) => {
        dispatch(
            openModal({
                text: "Delete product?",
                onConfirm: () => {
                    showModal("Product deleted")
                    dispatch(removeProductAsync(id))
                    dispatch(CLOSE_MODAL)
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        )
    }

    return (
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
                        <td className="product-title">{product.title}</td>
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
                                        navigate(`/product/${product.id}/edit`)
                                    }
                                />
                            </button>
                            <button>
                                <FaRegTrashAlt
                                    size="24px"
                                    onClick={() => onPostRemove(product.id)}
                                />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
