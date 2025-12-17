import express from 'express';
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@mkp.com';
const ADMIN_PASSWORD = 'admin123'; // change this if needed

// Health check
router.get('/health', (req, res) => {
  res.json({ message: 'Admin API is working' });
});

// Admin login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return res.status(200).json({ 
        token: 'admin-token',
        message: 'Login successful' 
      });
    }
    
    res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

export default router;
