const mongoose = require('mongoose');

const LaundrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    amount: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    idGroup: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    total: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('laundrys', LaundrySchema);