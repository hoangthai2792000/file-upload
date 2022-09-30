const Product = require('../models/Product')
const customError = require('../errors/customError')

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json({ products })
}

const createProduct = async (req, res) => {
  const product = await Product.create(req.body)

  res.status(201).json({ product })
}

module.exports = {
  createProduct,
  getAllProducts,
}
