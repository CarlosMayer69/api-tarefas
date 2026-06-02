const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    try {

        const { nome, email, senha } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "Usuário já cadastrado"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const senhaCriptografada = await bcrypt.hash(
            senha,
            salt
        );

        const novoUsuario = await User.create({
            nome,
            email,
            senha: senhaCriptografada
        });

        res.status(201).json({
            message: "Usuário criado com sucesso",
            id: novoUsuario._id
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const login = async (req, res) => {

    try {

        const { email, senha } = req.body;

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                message: "Usuário não encontrado"
            });
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                message: "Senha inválida"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login realizado com sucesso",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    register,
    login
};