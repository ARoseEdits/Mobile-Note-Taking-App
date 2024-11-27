const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection question (how to a keep this secret from github)
mongoose.connect('mongodb+srv://<db_username>:<db_password>@cluster0.swhyq.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema
const entrySchema = new mongoose.Schema({
    date: String,
    meal: String,
    description: String,
    calories: Number,
});

const Entry = mongoose.model('Entry', entrySchema);

// Routes
app.get('/entries', async (req, res) => {
    const entries = await Entry.find();
    res.json(entries);
});

app.post('/entries', async (req, res) => {
    const entry = new Entry(req.body);
    await entry.save();
    res.json(entry);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
