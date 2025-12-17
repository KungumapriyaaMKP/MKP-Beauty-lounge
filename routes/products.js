import express from 'express'
import multer from 'multer'
import Product from '../models/Product.js'

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json({ data: products })
  } catch (err) {
    console.error('Fetch products error:', err)
    res.status(500).json({ message: 'Error fetching products', error: err.message })
  }
})

// Create a product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, subcategory } = req.body
    const image = req.file ? req.file.filename : 'default.png'
    
    if (!name || !price || !category || !subcategory) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const product = new Product({ 
      name, 
      price: parseFloat(price), 
      category, 
      subcategory, 
      image 
    })
    
    const saved = await product.save()
    res.status(201).json({ message: 'Product created', data: saved })
  } catch (err) {
    console.error('Create product error:', err)
    res.status(500).json({ message: 'Error creating product', error: err.message })
  }
})

export default router