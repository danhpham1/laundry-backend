const mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const LaundrySchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
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
    idNameLaundry:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    total: {
        type: Number,
        required: true
    }
})

LaundrySchema.plugin(aggregatePaginate);


module.exports = mongoose.model('laundrys', LaundrySchema);