const mongoose = require('mongoose');
const GroupLaundryModel = require('../models/group-laundry');

//get group list
module.exports.getGroups = async (req, res) => {
    let options;
    if (req.query.currentPage && req.query.limit) {
        options = {
            page: req.query.currentPage,
            limit: req.query.limit
        };
    } else {
        options = {
            page: 1,
            limit: 10
        };
    }
    var groupAggregate = GroupLaundryModel.aggregate();
    GroupLaundryModel.aggregatePaginate(groupAggregate, options)
        .then(rs => {
            res.status(200).json({
                ...rs,
                success: true
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err
            })
        })
}

//process post group
module.exports.postGroup = async (req, res) => {
    let group = new GroupLaundryModel({
        name: req.body.name
    })
    try {
        await group.save();
        res.status(200).json({
            success: true,
            results: group
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}

//patch group
module.exports.patchGroup = async (req, res) => {
    let update;
    if (req.body.name) {
        update = { name: req.body.name };
    }
    if (req.body.isHide) {
        update = { ...update, isHide: req.body.isHide };
    }
    if (update) {
        try {
            let groupUpdate = await GroupLaundryModel.findByIdAndUpdate(req.params.id, { $set: { ...update, updateAt: Date.now() } }, { new: true });
            res.status(200).json({
                success: true,
                results: groupUpdate
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error
            })
        }
    } else {
        res.status(500).json({
            success: false,
            message: 'Please send name or isHide value to update '
        })
    }
}