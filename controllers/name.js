const mongoose = require('mongoose');
const NameLaundryModel = require('../models/name-laundry');
const GroupLaundryModel = require('../models/group-laundry');


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

        //update group laundries
        await GroupLaundryModel.findByIdAndUpdate(
            idGroup,
            {
                $addToSet: {
                    idNameLaundryArray: { idNameLaundry: mongoose.Types.ObjectId(nameLaundry._id) }
                }
            },
            {
                new: true
            }
        )

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

//patch name
module.exports.pathchNameLaundry = async (req, res) => {
    try {
        let id = req.params.id;
        let { name, isHide, price, idGroup } = req.body;
        let update = {
            updateAt: Date.now()
        };
        if (name) {
            update = { ...update, name: name }
        };
        if (isHide === true || isHide === false) {
            update = { ...update, isHide: isHide }
        };
        if (price) {
            update = { ...update, price: price }
        };
        if (idGroup) {
            update = { ...update, idGroup: idGroup }
            //update group
            let nameGroupOld = await NameLaundryModel.findById(id);
            await GroupLaundryModel.update(
                { _id: mongoose.Types.ObjectId(nameGroupOld.idGroup) },
                {
                    $pull: { idNameLaundryArray: { idNameLaundry: mongoose.Types.ObjectId(id) } },
                },
                { new: true },
            );

            await GroupLaundryModel.findByIdAndUpdate(
                idGroup,
                {
                    $addToSet: { idNameLaundryArray: { idNameLaundry: mongoose.Types.ObjectId(id) } }
                },
                { new: true }
            )
        };
        let nameLaundryUpdate = await NameLaundryModel.findByIdAndUpdate(id, {
            $set: update
        },
            { new: true }
        )
        res.status(200).json({
            success: true,
            results: nameLaundryUpdate
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

//delete name
module.exports.deleteNameLaundry = async (req, res) => {
    try {
        if (req.params.id && req.body.idGroup) {
            //update group laundry
            await GroupLaundryModel.findByIdAndUpdate(
                req.body.idGroup,
                { $pull: { idNameLaundryArray: { idGroup: mongoose.Types.ObjectId(req.params.id) } } },
                { new: true }
            )

            //delete name
            await NameLaundryModel.deleteOne({
                _id: mongoose.Types.ObjectId(req.params.id)
            })

            res.status(200).json({
                success: true,
                message: "Delete name laundry success"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}