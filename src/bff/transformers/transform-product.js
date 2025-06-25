export const transformProduct = (dbProduct) => ({
    id: dbProduct.id,
    title: dbProduct.title,
    price: dbProduct.price,
    category: dbProduct.category,
    gender: dbProduct.gender,
    size: dbProduct.size,
    imageUrl: dbProduct.image_url,
    brand: dbProduct.brand,
    description: dbProduct.description,
})
