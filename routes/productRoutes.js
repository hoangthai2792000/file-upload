const express = require('express')
const router = express.Router()

const {
  createProduct,
  getAllProducts,
} = require('../controllers/productController')

const { uploadProductImg } = require('../controllers/uploadImageController')

router.route('/').get(getAllProducts).post(createProduct)
router.route('/uploads').post(uploadProductImg)

module.exports = router
