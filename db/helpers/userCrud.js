const Usermodel = require("../models/user");
const appCodes = require('../../utils/appcodes');
var encrypt = require('../../utils/encrypt');
const jwt = require('../../utils/jwt');
const userOperations = {
    add(userObject, response) {
        userObject.password = encrypt.encryptPassword(userObject.password);
        Usermodel.create(userObject, (err) => {
            if (err) {
                console.log('Error in Record Add', err);
                response.status(appCodes.SERVER_ERROR).send({ status: appCodes.ERROR, message: 'Record Not Added Due to Error' });
            }
            else {
                console.log('Record Added..');
                response.status(appCodes.OK).send({ status: appCodes.SUCCESS, message: 'Record Added' });
            }
        })
    },
    sendblock(uid, response) {
        console.log("done")
        Usermodel.findOne({ "userId": uid }, (err, doc) => {
            if (err) {
                response.status(500).send({ status: 'E', message: 'Error in DB During Find Operation' });
            }
            else {
                console.log("done done")
                var b = {}
                b.data = doc.blockUser;
                b = JSON.stringify(b);
                console.log(b);
                response.status(200).send({ status: appCodes.SUCCESS, record: b });
            }
        })
    },
    block(uid, bid, response) {
        Usermodel.update({ "userId": uid }, { '$push': { 'blockUser': bid } }, (err) => {
            if (err) {
                response.status(500).send({ status: 'E', message: 'Error in DB During Find Operation' });
            }
        })
    },
    search(userObject, response) {
        userid = jwt.verifyToken(userObject.token);
        Usermodel.findOne({ "userId": userid }, (err, doc) => {
            if (err) {
                response.status(500).send({ status: 'E', message: 'Error in DB During Find Operation' });
            }
            else {
                if (doc) {
                    response.status(200).send({ status: appCodes.SUCCESS, record: doc });
                }
                else {
                    response.status(appCodes.RESOURCE_NOT_FOUND).send({ status: appCodes.FAIL, message: 'Invalid Userid or Password ' });
                }
            }
        })
    },
    login(userObject, response) {
        Usermodel.findOne({ "userId": userObject.userId }, (err, doc) => {
            if (err) {
                response.status(500).send({ status: 'E', message: 'Error in DB During Find Operation' });
            }
            else {
                if (doc) {
                    if (encrypt.compareHash(userObject.password, doc.password)) {
                        Utoken = jwt.generateToken(userObject.userId);
                        response.status(200).send({ status: appCodes.SUCCESS, token: Utoken });
                    }
                    else {
                        response.status(appCodes.RESOURCE_NOT_FOUND).send({ status: appCodes.FAIL, message: 'Invalid Userid or Password ' });
                    }
                }
                else {
                    response.status(appCodes.RESOURCE_NOT_FOUND).send({ status: appCodes.FAIL, message: 'Invalid Userid or Password ' });
                }
            }
        })
    },
    fetchname(userid) {
        Usermodel.findOne({ "userId": userid }, (err, doc) => {
            return doc.Uname;
        })
    },
    update(userObject, response) {
        userObject.password = encrypt.encryptPassword(userObject.password);
        Usermodel.updateOne({ "userId": userObject.userId }, { $set: { "password": userObject.password } }, (err, doc) => {
            if (err) {
                response.status(500).send({ status: 'E', message: 'Error in DB During Find Operation' });
            }
            else {
                console.log('Record updated..');
                response.status(appCodes.OK).send({ status: appCodes.SUCCESS, message: 'Record updated' });
            }
        })
    }
}
module.exports = userOperations;