const customError = require('../errors/customError')
const path = require('path')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImgLocal = async (req, res) => {
  // console.log(req.files)
  if (!req.files) {
    throw new customError('No file uploaded', 400)
  }

  const productImage = req.files.image

  if (!productImage.mimetype.startsWith('image')) {
    throw new customError('Image only!!!', 400)
  }

  if (productImage.size > 1024 * 1024) {
    throw new customError('Please upload image smaller than 1KB', 400)
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )
  // console.log(imagePath)

  await productImage.mv(imagePath)

  return res
    .status(200)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

const uploadProductImg = async (req, res) => {
  // console.log(req.files.image)
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  )
  fs.unlinkSync(req.files.image.tempFilePath)
  return res.status(200).json({ image: { src: result.secure_url } })
}

module.exports = {
  uploadProductImg,
}
