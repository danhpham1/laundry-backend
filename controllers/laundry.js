const LaundryModel = require('../models/laundry');
const mongoose = require('mongoose');

//post laundry
module.exports.postLaundry = async (req, res) => {
    try {
        let {
            idUser,
            weight,
            price,
            group,
            name,
            total
        } = req.body;

        let laundry = new LaundryModel({
            idUser: idUser,
            weight: weight,
            price: price,
            group: group,
            name: name,
            total: total
        });

        await laundry.save();

        res.status(200).json({
            success: true,
            message: "Create success"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

//get laundry
module.exports.getLaundry = async (req, res) => {
    try {
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
        let idUser = mongoose.Types.ObjectId(req.params.idUser);
        var laundryAggregate = LaundryModel.aggregate([
            {
                $match: { idUser: idUser }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: 'idUser',
                    foreignField: '_id',
                    as: 'userInfo'
                },

            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$userInfo", 0] }, "$$ROOT"] } }
            },
            {
                $project:
                {
                    'username': 1,
                    '_id': 1,
                    'name': 1,
                    'createAt': 1,
                    'updateAt': 1,
                    'weight': 1,
                    'price': 1,
                    'total': 1,
                    'group': 1,
                    'name': 1
                }
            }
        ]);
        LaundryModel.aggregatePaginate(laundryAggregate, options)
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
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

//patch laundry
module.exports.patchLaundry = async (req, res) => {
    try {
        let { weight, price, idGroup, idNameLaundry, total } = req.body;
        let dataJson = {};
        if (weight) {
            dataJson = {
                weight: weight
            }
        };
        if (price) {
            dataJson = {
                ...dataJson,
                price: price
            }
        };
        if (idGroup) {
            dataJson = {
                ...dataJson,
                idGroup: mongoose.Types.ObjectId(idGroup)
            }
        };
        if (idNameLaundry) {
            dataJson = {
                ...dataJson,
                idNameLaundry: mongoose.Types.ObjectId(idNameLaundry)
            }
        };
        if (total) {
            dataJson = {
                ...dataJson,
                total: total
            }
        }

        await LaundryModel.findByIdAndUpdate(mongoose.Types.ObjectId(
            req.params.id),
            {
                $set: { ...dataJson, updateAt: Date.now() }
            },
            {
                new: true
            }
        )

        res.status(200).json({
            success: true,
            message: "Update success"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

module.exports.deleteLaundry = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            await LaundryModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
            res.status(200).json({
                success: true,
                message: 'delete success'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}