import express from 'express'
import Stock from '../models/Stock.js'

const router = express.Router()

// Get all stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 })
    res.json({ data: stocks })
  } catch (err) {
    console.error('Fetch stocks error:', err)
    res.status(500).json({ message: 'Error fetching stocks', error: err.message })
  }
})

// Create a stock item
router.post('/', async (req, res) => {
  try {
    const { name, sku, price, quantity } = req.body
    if (!name || !sku || price == null || quantity == null) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    const existing = await Stock.findOne({ sku })
    if (existing) return res.status(400).json({ message: 'SKU already exists' })

    const stock = new Stock({ name, sku, price, quantity })
    const saved = await stock.save()
    res.status(201).json({ message: 'Stock created', data: saved })
  } catch (err) {
    console.error('Create stock error:', err)
    res.status(500).json({ message: 'Error creating stock', error: err.message })
  }
})

// Delete a stock item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const removed = await Stock.findByIdAndDelete(id)
    if (!removed) return res.status(404).json({ message: 'Stock not found' })
    res.json({ message: 'Stock deleted' })
  } catch (err) {
    console.error('Delete stock error:', err)
    res.status(500).json({ message: 'Error deleting stock', error: err.message })
  }
})

export default router
