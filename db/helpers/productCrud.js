const productModel = require("../models/products");
const appCodes = require('../../utils/appcodes');
const productOperations = {
    add(productObject, response) {
        productModel.create(productObject, (err) => {
            if (err) {
                console.log('Error in Record Add');
                response.status(appCodes.SERVER_ERROR).json({ status: appCodes.ERROR, message: 'Record Not Added Due to Error' });
            }
            else {
                console.log('Record Added..');
                response.status(appCodes.OK).json({ status: appCodes.SUCCESS, message: 'Record Added' });
            }
        })
    },
    search(pprice, response) {
        productModel.find({ "price": { $gt: pprice } }, (err, docs) => {
            if (err) {
                response.status(500).json({ status: 'E', message: 'Error in DB During Find Operation' });
            }
            else {
                if (docs) {
                    response.status(200).json({ status: appCodes.SUCCESS, message: 'Products are' + docs });
                }
                else {
                    response.status(appCodes.RESOURCE_NOT_FOUND).json({ status: appCodes.FAIL, message: 'Invalid Userid or Password ' });
                }
            }
        })
    }
}
module.exports = productOperations;