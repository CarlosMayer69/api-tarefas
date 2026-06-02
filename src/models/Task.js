const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true
        },

        descricao: {
            type: String,
            trim: true
        },

        concluida: {
            type: Boolean,
            default: false
        },

        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);