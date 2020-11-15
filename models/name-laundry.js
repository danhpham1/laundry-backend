const mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const NamesLaundrySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
        required: true,
    }
})

NamesLaundrySchema.plugin(aggregatePaginate);

module.exports = mongoose.model('names_laundry', NamesLaundrySchema);