const mongoose = require('mongoose');
const GroupLaundryModel = require('../models/group-laundry');
const NameLaundryModel = require('../models/name-laundry');

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
    if (req.query.name) {
        options = {
            ...options,
            sort: { name: req.query.name }
        }
        console.log(options)
    }
    var groupAggregate = GroupLaundryModel.aggregate([
        {
            $lookup: {
                from: 'names_laundries',
                let: { 'idNameLaundryArray': '$idNameLaundryArray' },
                pipeline: [
                    { $match: { $expr: { $in: ['$_id', '$$idNameLaundryArray.idNameLaundry'] } } }
                ],
                as: 'nameLaundryArrayInfo'
            }
        }
    ]);
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
    try {
        let group = new GroupLaundryModel({
            name: req.body.name,
            createAt: Date.now()
        });
        await group.save();
        res.status(200).json({
            success: true,
            results: group
        });
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

//delete group
module.exports.deleteGroup = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            await NameLaundryModel.deleteMany({ idGroup: mongoose.Types.ObjectId(id) });
            await GroupLaundryModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
            res.status(200).json({
                success: true,
                message: 'delete group and name related success'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

module.exports.getAllGroups = async (req, res) => {
    try {
        let listGroups = await GroupLaundryModel.aggregate(
            [
                {
                    $lookup: {
                        from: 'names_laundries',
                        localField: '_id',
                        foreignField: 'idGroup',
                        as: 'namesArray'
                    }
                },
                {
                    $project:{
                        _id:1,
                        name:1,
                        namesArray:1
                    }
                }
            ]
        )
        res.status(200).json({
            success: true,
            data: listGroups
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}