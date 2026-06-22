const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from workspace directory
app.use(express.static(path.join(__dirname)));

// Root URL redirect to webpage.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'webpage.html'));
});

// MongoDB Database Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lamborghini';
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB database at:', mongoURI);
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB database:', err.message);
    });

// Schema definition
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    car_model: { type: String, required: true },
    config_color: { type: String },
    location: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

/* --- API Endpoints --- */

// POST: Save contact form submission
app.post('/api/contact', async (req, res) => {
    const { name, email, car_model, config_color, location } = req.body;

    // Basic Validation
    if (!name || !name.trim() || !email || !email.trim() || !car_model || !car_model.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Name, Email, and Car Model are required fields.'
        });
    }

    try {
        const contact = new Contact({
            name: name.trim(),
            email: email.trim(),
            car_model: car_model.trim(),
            config_color,
            location
        });
        const savedContact = await contact.save();
        return res.json({
            success: true,
            message: 'Your booking request has been successfully registered in the database!',
            id: savedContact._id.toString()
        });
    } catch (err) {
        console.error('Error inserting database record:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to save booking request in database.'
        });
    }
});



// Start Server
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(` Lamborghini SVJ Showcase Server running successfully!`);
    console.log(` Local URL: http://localhost:${PORT}`);
    console.log(` Admin Dashboard: http://localhost:${PORT}/dashboard.html`);
    console.log(`===================================================`);
});
