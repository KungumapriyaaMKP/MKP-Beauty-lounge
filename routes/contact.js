import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST: Save contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newContact = new Contact({
      name,
      email,
      phone: phone || '',
      message
    });

    const savedContact = await newContact.save();
    res.status(201).json({ message: "Message submitted successfully", data: savedContact });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ message: "Error submitting message", error: err.message });
  }
});

// GET: Fetch all contact messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ data: contacts });
  } catch (err) {
    console.error('Fetch contacts error:', err);
    res.status(500).json({ message: "Error fetching messages", error: err.message });
  }
});

export default router;
