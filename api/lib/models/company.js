const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    _id: false,
    created_at: {
        type: Date,
        default: Date.now
    },
    year: {
        type: Number,
        default: Date.now.year
    },
    addition: {
        type: Number,
        default: 0
    },
    withdraw: {
        type: Number,
        default: 0
    }
});

const companySchema = new Schema({
    _id:  mongoose.Schema.ObjectId,
    name: {
        type: String,
        required:  true
    },
    legal_name: {
        type: String,
        required:  false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    cnpj: {
        type: Number,
        unique: true,
        index: true,
        default: 0
    },
    imp_disc_rate: {
        type: Number,
        default: 0
    },
    entry: {
        type: [entrySchema],
        default: []
    }
});

module.exports = mongoose.model('Company', companySchema);