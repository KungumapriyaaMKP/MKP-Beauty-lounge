import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Stock', stockSchema)
