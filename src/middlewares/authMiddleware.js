const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token não fornecido"
        });
    }

    const partes = authHeader.split(" ");

    if (partes.length !== 2) {
        return res.status(401).json({
            message: "Token inválido"
        });
    }

    const [scheme, token] = partes;

    if (scheme !== "Bearer") {
        return res.status(401).json({
            message: "Formato do token inválido"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Token inválido ou expirado"
        });

    }

};

module.exports = authMiddleware;