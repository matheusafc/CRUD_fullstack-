import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true, 
        unique: true   
    },
    occupation: {
        type: String,
        required: true 
    },
    dataCriacao: {
        type: Date,
        default: Date.now 
    }
});

const User = mongoose.model('User', UsersSchema);

export default User;