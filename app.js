const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'YOUR_MONGODB_ATLAS_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});