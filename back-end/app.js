import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import User from './Users.js'

dotenv.config();

const app = express();
const PORT = 8081;

app.use(express.json()); // tratamento
app.use(cors());

// Conexão com DB
const connetDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.log("Erro ao conectar no MongoDB", error);
    }
};


connetDB();

// Create
app.post("/users", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({message: "E-mail já cadastrado."});
        }
        res.status(500).json({ massage: "Erro ao criar usuário", error: error.massage });
    }
});

// Read 
app.get("/users", async (req, res) => {
    try {
        const listUsers = await User.find();
        res.status(201).json(listUsers);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar todos os usuário", error: error.message });
    }
});

// Read ID
app.get("/users/:id", async (req, res) => {
    try {
        const userId = await User.findById(req.params.id);
        if (!userId) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(userId);
    } catch (error) {
        res.status(500).json({ message: "Erro ao encontrar usuário", error: error.message });
    }
}
);

// Uptade 
app.put("/users/:id", async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body,
            { new: true }
        );
        if (!updateUser) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(updateUser);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar usuário", error: error.message });
    }
}
);

// Delete 
app.delete("/users/:id", async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(deleteUser);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar usuário", error: error.message });
    }
}
);


app.listen(PORT, () => {

    console.log("servidor ON..");

});