const express = require("express");
const {
    addCart,
    getCart,
    updateCart,
    deleteCart
} = require("../controllers/cart")
const mapCart = require("../helpers/mapCart")
const authenticated = require("../middleware/authenticated")
const hasRole = require("../middleware/hasRole")
const ROLES = require("../constants/roles")

const router = express.Router();


router.get("/", authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER]), async (req, res) => {
    const userId = req.user._id;
    const cart = await getCart(userId);

    res.send({ data: mapCart(cart) })
})

router.post("/", authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER]), async (req, res) => {
    const newProductForCart = await addCart(req.body);

    res.send({ data: mapCart([newProductForCart]) })
})

router.patch("/:id", authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER]), async (req, res) => {
    const updatedProduct = await updateCart(req.params.id, req.body);

    res.send({ data: mapCart([updatedProduct]) })
})


router.delete("/:id", authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER]), async (req, res) => {
    await deleteCart(req.params.id)

    res.send({ error: null })
})

module.exports = router;