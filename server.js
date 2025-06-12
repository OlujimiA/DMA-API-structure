require('dotenv').config();
const express = require('express');
const app = express();

// Import different route files
const clientRoutes = require('./routes/clientRoutes');
const orgRoutes = require('./routes/orgRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const leadRoutes = require('./routes/leadRoutes');

app.use(express.json());

// Mount routes to different paths
app.use('/api/clients', clientRoutes);
app.use('/api/orgs', orgRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/leads', leadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
