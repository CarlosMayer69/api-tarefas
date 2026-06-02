const express = require("express");
const cors = require("cors");

console.log("APP.JS CARREGADO");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("API funcionando");
});

/*
|--------------------------------------------------------------------------
| Rotas de Usuários
|--------------------------------------------------------------------------
*/

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

/*
|--------------------------------------------------------------------------
| Rota Protegida para Testes JWT
|--------------------------------------------------------------------------
*/

app.get(
    "/api/protegida",
    authMiddleware,
    (req, res) => {

        res.json({
            message: "Acesso autorizado",
            userId: req.userId
        });

    }
);

module.exports = app;
app.use("/api/users", userRoutes);

module.exports = app;