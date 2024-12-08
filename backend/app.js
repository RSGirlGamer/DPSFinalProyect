const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { errorHandler } = require('./utils/errorHandler');

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 5000;

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

// Probar conexión a la base de datos
db.authenticate()
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch((error) => console.error("Error al conectar a la base de datos:", error));

// Rutas
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/rsvp", require("./routes/rsvpRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));


// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
