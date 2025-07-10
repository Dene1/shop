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
    const mappedProducts = products.map(product => mapProduct(product));
    res.send({ data: mappedProducts })
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
    const newProduct = await addProduct({
        title: req.body.title,
        image_url: req.body.image_url,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        size: req.body.size,
        gender: req.body.gender,
        description: req.body.description
    });
    const savedProduct = await newProduct.save()
    res.send({ data: mapProduct(savedProduct) })
})

router.patch("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const updatedProduct = await editProduct(
        req.params.id,
        {
            title: req.body.title,
            image_url: req.body.image_url,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            size: req.body.size,
            gender: req.body.gender,
            description: req.body.description
        }
    )
    res.send({ data: mapProduct(updatedProduct) })
})

router.delete("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteProduct(req.params.id)

    res.send({ error: null })
})

module.exports = router