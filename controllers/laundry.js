const LaundryModel = require('../models/laundry');
const mongoose = require('mongoose');

//post laundry
module.exports.postLaundry = async (req,res)=>{
    try {
        let {
            idUser,
            weight,
            price,
            idGroup,
            idNameLaundry,
            total
        } = req.body;

        let laundry = new LaundryModel({
            idUser:idUser,
            weight:weight,
            price:price,
            idGroup:idGroup,
            idNameLaundry:idNameLaundry,
            total:total
        });

        await laundry.save();

        res.status(200).json({
            success:true,
            message:"Create success"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error
        })
    }
}

//get laundry
module.exports.getLaundry = async (req,res)=>{
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
                $match:{idUser:idUser}
            },
            {
                $lookup:
                {
                    from:"users",
                    localField:'idUser',
                    foreignField:'_id',
                    as:'userInfo'
                },
                
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$userInfo", 0 ] }, "$$ROOT" ] } }
            },
            {
                $lookup:
                {
                    from:"groups_laundries",
                    localField:'idGroup',
                    foreignField:'_id',
                    as:'groupInfo'
                },
                
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$groupInfo", 0 ] }, "$$ROOT" ] } }
            },
            {
                $lookup:
                {
                    from:"names_laundries",
                    localField:'idNameLaundry',
                    foreignField:'_id',
                    as:'nameLaundryInfo'
                },
                
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$nameLaundryInfo", 0 ] }, "$$ROOT" ] } }
            },
            {
                $project:
                {
                    'username':1,
                    '_id':1,
                    'name':1,
                    'email':1,
                    'createAt':1,
                    'updateAt':1,
                    'weight':1,
                    'price':1,
                    'total':1,
                    'groupInfo':1,
                    'nameLaundryInfo':1
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
            success:false,
            error:error
        })
    }
}