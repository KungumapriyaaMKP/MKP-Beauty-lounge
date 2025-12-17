import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';
import stocksRoutes from './routes/stocks.js';
import productsRoutes from './routes/products.js';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/stocks', stocksRoutes);
app.use('/api/products', productsRoutes);

// Connect MongoDB (use .env MONGO_URI if provided)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mkp-beauty';
console.log('Connecting to MongoDB with URI:', MONGO_URI.startsWith('mongodb://127.0.0.1') ? 'local mongodb' : 'provided MONGO_URI');
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
