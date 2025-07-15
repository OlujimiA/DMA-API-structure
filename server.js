require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { authorizeRoles } = require('./middlewares/authenticate');

// Import different route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orgRoutes = require('./routes/orgRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(express.json());
app.use(cookieParser());

// Mount routes to different paths
app.use('/api/users', userRoutes);
app.use('/api/orgs', orgRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/admin', authorizeRoles('admin'), adminRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
