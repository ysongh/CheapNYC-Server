const { validationResult } = require("express-validator/check");

const Item = require("../models/Item");
const Report = require("../models/Report");

exports.getAllReport = (req, res, next) => {
    Report.find()
        .then(result => {
            res.status(200).json({
                msg: "Success on finding all reports",
                reports: result
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};

exports.addReport = (req, res, next) => {
    const itemId = req.params.itemId;
    const name = req.user.name;
    const text = req.body.text;
    let error;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        let errorList = {};
        
        for(let error in errors.array()){
            let field = errors.array()[error].param;
            errorList[field] = errors.array()[error].msg;
        }
        
        return res.status(422).json(errorList);
    }

    const reportData = new Report({
        itemId: itemId,
        name: name,
        text: text
    });
    
    Item.findById(itemId)
        .then(item => {
            if(!item){
                throw new error(res.status(404).json({error: 'Item not found'}));
            }
            return reportData.save();
        })
        .then(result => {
            res.status(201).json({
                msg: "Success on reporting this post",
                review: result
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};