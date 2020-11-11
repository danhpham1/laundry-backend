const mongoose = require('mongoose');

const GroupsLaundrySchema = new mongoose.Schema({
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
    }
})


module.exports = mongoose.model('groups_laundry', GroupsLaundrySchema);