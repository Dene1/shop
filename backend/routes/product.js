const express = require("express")
const {
    addProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProduct,
    getAllProducts
} = require("../controllers/product")
const { addReview, deleteReview } = require("../controllers/review")
const authenticated = require("../middleware/authenticated")
const mapProduct = require("../helpers/mapProduct")
const mapReview = require("../helpers/mapReview")
const hasRole = require("../middleware/hasRole")
const ROLES = require("../constants/roles")

const router = express.Router({ mergeParams: true })

router.get("/", async (req, res) => {
    const { products, lastPage } = await getProducts(
        req.query.searchPhrase,
        req.query.page,
        req.query.limit
    )

    res.send({ data: { lastPage, products: products.map(mapProduct) } })
})

router.get("/all", async (req, res) => {
    const products = await getAllProducts()

    res.send({ data: products })
})

router.get("/:id", async (req, res) => {
    const product = await getProduct(req.params.id)

    res.send({ data: mapProduct(product) })
})

router.post("/:id/reviews", authenticated, async (req, res) => {
    const newReview = await addReview(req.params.id, {
        content: req.body.content,
        author: req.user.id
    })
    res.send({ data: mapReview(newReview) })
})

router.delete("/:productId/reviews/:reviewId", authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    await deleteReview(req.params.productId, req.params.reviewId)

    res.send({ error: null })
})

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    console.log("POST called", req.params.id, req.body)
    const newProduct = await addProduct({
        title: req.body.title,
        image_url: req.body.imageUrl,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        size: req.body.size,
        gender: req.body.gender,
        description: req.body.description
    })

    res.send({ data: mapProduct(newProduct) })
})

router.patch("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    console.log("PATCH /:id called", req.params.id, req.body)
    const updatedProduct = await editProduct(
        req.params.id,
        {
            title: req.body.title,
            image_url: req.body.imageUrl,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            size: req.body.size,
            gender: req.body.gender,
            description: req.body.description
        }
    )
    console.log("updatedProduct:", updatedProduct)
    res.send({ data: mapProduct(updatedProduct) })
})

router.delete("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteProduct(req.params._id)

    res.send({ error: null })
})

module.exports = router