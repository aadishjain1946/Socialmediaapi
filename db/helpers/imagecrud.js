const imagemodel = require("../models/images");
const appCodes = require('../../utils/appcodes');
const jwt = require('../../utils/jwt');
const fs = require("fs");
const path = require("path");
const fullPath = path.join(__dirname, "../../", "public");
const imageOperations = {
    upload(userObject, response) {
        imagemodel.create(userObject, (err) => {
            if (err) {
                console.log(err);
            }
        })
    },
    like(uid) {
        imagemodel.update({ "imageId": uid }, { '$inc': { 'likes': 1 } }, (err) => {
            if (err) {
                response.status(500).send({ status: 'E', message: 'Error in DB During Find Operation' });
            }
        })
    },
    superlike(uid) {
        imagemodel.update({ "imageId": uid }, { '$inc': { 'superlikes': 1 } }, (err) => {
            if (err) {
                response.status(500).send({ status: 'E', message: 'Error in DB During Find Operation' });
            }
        })
    },
    search(b,response) {
        // userid = jwt.verifyToken(userObject.token);
        imagemodel.find({'userId':{'$nin':b}}, (err, docs) => {
            if (err) {
                response.status(500).send({ status: 'E', message: 'Error in DB During Find Operation' });
            }
            else {
                if (docs) {
                    response.status(200).send({ status: appCodes.SUCCESS, record: docs });
                }
                else {
                    response.status(appCodes.RESOURCE_NOT_FOUND).send({ status: appCodes.FAIL, message: 'Invalid Userid or Password ' });
                }
            }
        })
    }
}
module.exports = imageOperations;