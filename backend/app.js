const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database");

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

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
