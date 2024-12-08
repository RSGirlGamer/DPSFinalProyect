const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use('/api/comments', commentRoutes);

// Middleware global de manejo de errores
app.use(errorHandler);

module.exports = app;