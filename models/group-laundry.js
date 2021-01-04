const mongoose = require('mongoose');

var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const GroupsLaundrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
    idNameLaundryArray: {
        type: Array,
    }
})

GroupsLaundrySchema.plugin(aggregatePaginate);


module.exports = mongoose.model('groups_laundry', GroupsLaundrySchema);