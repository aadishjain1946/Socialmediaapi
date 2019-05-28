const express = require('express');
const productRoute = express.Router();
productRoute.post('/addProduct',(request, response)=>{
    const json = request.body;
    const productcrud = require('../db/helpers/productCrud');
    productcrud.add(json,response);
})
productRoute.get('/searchProduct',(request, response)=>{
    const price = request.query.price;
    const productcrud = require('../db/helpers/productCrud');
    productcrud.search(price, response);

})
productRoute.get('/profile',(request, response)=>{
    
})
module.exports = productRoute;