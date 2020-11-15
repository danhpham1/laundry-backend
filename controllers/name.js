const mongoose = require('mongoose');
const NameLaundryModel = require('../models/name-laundry');


//get name
module.exports.getNameLaundry = async (req, res) => {
    try {
        let options = {
            page: req.query.currentPage ? req.query.currentPage : 1,
            limit: req.query.limit ? req.query.limit : 10
        };
        let nameLaundryAggregate = NameLaundryModel.aggregate();
        let docs = await NameLaundryModel.aggregatePaginate(nameLaundryAggregate, options);
        res.status(200).json({
            success: true,
            ...docs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}
//post name
module.exports.postNameLaundry = async (req, res) => {
    try {
        let { name, idGroup, isHide } = req.body;
        // console.log(req.body.price.toFixed(3));
        let nameLaundry = new NameLaundryModel({
            name: name,
            idGroup: idGroup,
            price: req.body.price.toFixed(3),
            isHide: isHide
        });
        await nameLaundry.save();
        res.status(200).json({
            success: true,
            results: nameLaundry
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}