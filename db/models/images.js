const connection = require("../connection");
const Schema = connection.Schema;
const imageSchema = new Schema({
    'userId': { type: String, required: true },
    'imageId': { type: String, required: true },
    'likes': { type: Number, default: 0 },
    'superlikes': { type: Number, default: 0 },
});
const imageModel = connection.model('images', imageSchema);
module.exports = imageModel;
