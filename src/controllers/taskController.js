const Task = require("../models/Task");

const createTask = async (req, res) => {

    try {

        const { titulo, descricao } = req.body;

        const task = await Task.create({

            titulo,
            descricao,

            usuario: req.userId

        });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            usuario: req.userId
        });

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateTask = async (req, res) => {

    try {

        const { id } = req.params;

        const task = await Task.findOne({
            _id: id,
            usuario: req.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada"
            });
        }

        task.titulo = req.body.titulo || task.titulo;
        task.descricao = req.body.descricao || task.descricao;

        if (req.body.concluida !== undefined) {
            task.concluida = req.body.concluida;
        }

        await task.save();

        res.status(200).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        const task = await Task.findOne({
            _id: id,
            usuario: req.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada"
            });
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Tarefa removida com sucesso"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};