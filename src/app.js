// src/app.js
const express = require("express");
const app = express();


// Middleware para ler JSON no body
app.use(express.json());
// Importar rotas
const participanteRoutes = require("./routes/participanteRoutes");
const eventoRoutes = require("./routes/eventoRoutes");
const inscricaoRoutes = require("./routes/InscricaoRoutes");

app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
// Usar rotas com prefixo
app.use("/eventos", eventoRoutes);
// Rota raiz (informativa)
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        rotas: {
            eventos: "/eventos",
            participantes: "/participantes",
            inscricoes: "/inscricoes",
        },
    });
});

module.exports = app;