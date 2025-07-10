const Product = require("../models/Product")

async function addProduct(product) {
    return Product.create(product)
}

async function editProduct(id, product) {
    const newProduct = await Product.findByIdAndUpdate(id, product, { returnDocument: "after" })

    await newProduct.populate({
        path: "reviews",
        populate: "author"
    })

    return newProduct
}

function deleteProduct(id) {
    return Product.deleteOne({ _id: id })
}

async function getProducts(search = "", page = 1, limit = 10) {
    const [products, count] = await Promise.all([
        Product.find({
            title: { $regex: search, $options: "i" }
        })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }),
        Product.countDocuments({ title: { $regex: search, $options: "i" } })
    ])

    return {
        products,
        lastPage: Math.ceil(count / limit),
    }
}

async function getAllProducts() {
    const products = await Product.find()

    return products
}

function getProduct(id) {
    return Product.findById(id).populate({
        path: "reviews",
        populate: "author"
    })
}

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProduct,
    getAllProducts
}