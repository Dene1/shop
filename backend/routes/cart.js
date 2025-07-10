const express = require("express");
const {
    getCart,
    deleteCart
} = require("../controllers/cart")
const mapProduct = require("../helpers/mapProduct")
const authenticated = require("../middleware/authenticated")
const hasRole = require("../middleware/hasRole")
const ROLES = require("../constants/roles")

const router = express.Router();

router.get("/", authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER]), async (req, res) => {
    const cart = await getCart()

    res.send({ data: cart })
})


router.post("/", authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER]), async (req, res) => {
    // const newProduct = await addProduct({
    //     title: req.body.title,
    //     image_url: req.body.image_url,
    //     price: req.body.price,
    //     brand: req.body.brand,
    //     category: req.body.category,
    // });

    const savedProduct = await newProduct.save()
    res.send({ data: mapProduct(savedProduct) })
})


router.delete("/:id", authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER]), async (req, res) => {
    await deleteCart(req.params.id)

    res.send({ error: null })
})

module.exports = router;