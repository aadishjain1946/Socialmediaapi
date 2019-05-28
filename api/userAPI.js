const express = require('express');
const userRoute = express.Router();
const mult = require('../utils/multer');
var upload = mult;
userRoute.post('/register', (request, response) => {
    var data = "";
    request.on('data', (chunk) => {
        data += chunk;
    })
    request.on('end', () => {
        console.log(data);
        json = JSON.parse(data);
        console.log(json);
        const usercrud = require('../db/helpers/usercrud');
        usercrud.add(json, response);
    })

})
userRoute.post('/login', (request, response) => {
    var data = "";
    request.on('data', (chunk) => {
        data += chunk;
    })
    request.on('end', () => {
        json = JSON.parse(data);
        const usercrud = require('../db/helpers/usercrud');
        usercrud.login(json, response);
    })
})
userRoute.post('/update', (request, response) => {
    var data = "";
    request.on('data', (chunk) => {
        data += chunk;
    })
    request.on('end', () => {
        json = JSON.parse(data);
        const usercrud = require('../db/helpers/usercrud');
        usercrud.update(json, response);
    })
})
userRoute.post('/find', (request, response) => {
    // console.log(request.body.body);
    json = JSON.parse(request.body.body);
    const usercrud = require('../db/helpers/usercrud');
    usercrud.search(json, response);
})
userRoute.post('/imageload', (request, response) => {
    var data = request.body;
    var dt = data.body
    json = JSON.parse(dt);
    var b = json.buser;
    // const jwt = require('../utils/jwt');
    const imagecr = require("../db/helpers/imagecrud");
    imagecr.search(b, response);
})
userRoute.post('/upload', upload.single('userPhoto'), (request, response) => {
    const jwt = require('../utils/jwt');
    userid = jwt.verifyToken(request.body.token);
    var filename = request.file.filename;
    var obj = {
        'userId': userid,
        'imageId': filename,
    }
    const imagecr = require("../db/helpers/imagecrud");
    imagecr.upload(obj, response);
})
userRoute.get('/block', (request, response) => {
    const jwt = require('../utils/jwt');
    var tk = request.query.token;
    var bid = request.query.blockid;
    userid = jwt.verifyToken(tk);
    if (userid == bid) {
        response.status(500).send({ status: 'E', message: 'you cannot block yourself!!' });
    }
    else {
        const imagecr = require("../db/helpers/userCrud");
        imagecr.block(userid, bid, response);
    }
})
userRoute.get('/like', (request, response) => {
    var tk = request.query.imgid;
    const imagecr = require("../db/helpers/imagecrud");
    imagecr.like(tk);
})
userRoute.get('/superlike', (request, response) => {
    var tk = request.query.imgid;
    const imagecr = require("../db/helpers/imagecrud");
    imagecr.superlike(tk);
})
userRoute.post('/blockload', (request, response) => {
    json = request.body;
    json = json.body;
    json = JSON.parse(json)
    const jwt = require('../utils/jwt');
    userid = jwt.verifyToken(json.token);
    const imagecr = require("../db/helpers/userCrud");
    imagecr.sendblock(userid, response);
})
module.exports = userRoute;