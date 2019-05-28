const connection = require("../connection");
const Schema = connection.Schema;
const productSchema = new Schema({
    'productId': { type: String, required: true, unique: true },
    'price': { type: String, required: true, default: 000 },
    'name': { type: String, required: true },
    'url': { type: String, required: true }
});
const productModel = connection.model('products', productSchema);
module.exports = productModel;
