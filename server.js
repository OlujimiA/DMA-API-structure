require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { authorizeRoles } = require('./middlewares/authenticate');
const PORT = process.env.PORT || 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DMA-API",
            version: "1.0.0",
            description: "An API for digital marketing agency, Nigeria",
        },
        servers: [
            {
                url: `http://localhost/${PORT}`
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Import different route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orgRoutes = require('./routes/orgRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(express.json());
app.use(cookieParser());

// Mount routes to different paths
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes);
app.use('/api/orgs', orgRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-request', requestRoutes);
app.use('/api/admin', authorizeRoles('admin'), adminRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));