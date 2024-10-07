const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required:  true
    },
    _id: {
        type: String
    },
    email: {
        type: String,
        required:  true
    },
    passwd:{
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    change_passwd:{
        type: Boolean,
        default: false
    },
    cnpj: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);