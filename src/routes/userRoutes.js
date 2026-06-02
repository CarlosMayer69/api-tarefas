const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/userController");

router.get("/teste", (req, res) => {
    res.json({
        message: "Rota funcionando"
    });
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;