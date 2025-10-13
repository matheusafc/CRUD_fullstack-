import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = 8081;

const connetDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.log("Erro ao conectar no MongoDB", error);


    }
};

connetDB();



app.listen(PORT, () => {

    console.log("servidor ON..");

});