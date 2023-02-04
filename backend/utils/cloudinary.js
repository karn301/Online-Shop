const dotenv = require('dotenv')
const cloudinaryModel = require('cloudinary')
dotenv.config()
const cloudinary = cloudinaryModel.v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
module.exports = cloudinary