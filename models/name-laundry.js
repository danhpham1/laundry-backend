const mongoose = require('mongoose');

const NamesLaundrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    isHide: {
        type: Boolean,
        default: false
    },
    idGroup: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('names_laundry', NamesLaundrySchema);