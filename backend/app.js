const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use('/api/comments', commentRoutes);
// Backend (Node.js, Express.js)
app.put('/api/user/update', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Validación básica
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }
  
    try {
      // Actualiza los datos del usuario en la base de datos
      // Asegúrate de tener un modelo de usuario que realice esta operación
      const updatedUser = await User.findByIdAndUpdate(req.user.id, { username, email, password });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
  
      res.status(200).json({ message: "Perfil actualizado correctamente." });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      res.status(500).json({ message: "Error del servidor." });
    }
});
  

module.exports = app;
