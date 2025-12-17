import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@mkp.com';
const ADMIN_PASSWORD_HASH = '$2a$10$ZxqN8mU2vR9MZzLJQZlE7eO2JtKcWzW0kK8ZQy0XyYtK8M9cWJ2QG'; // hashed password

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ error: 'Invalid email or password' });
  } 

  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Login successful → send token or set session
  res.status(200).json({ message: 'Login successful', token: 'admin-token' });
});

export default router;
