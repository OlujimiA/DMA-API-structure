require('dotenv').config();
const express = require('express');
const app = express();

// Import different route files
const leadRoutes = require('./routes/leadRoutes');
const clientRoutes = require('./routes/clientRoutes');
const orgRoutes = require('./routes/orgRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

// Mount routes to different paths
app.use('/api/clients', clientRoutes);
app.use('/api/orgs', orgRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
