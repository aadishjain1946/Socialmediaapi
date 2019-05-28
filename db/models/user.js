const connection = require("../connection");
const Schema = connection.Schema;
const userSchema = new Schema({
    'userId':{type:String, required:true, unique:true},
    'password':{type:String,required:true,default:"abcd"},
    'Uname':{type:String,required:true},
    'blockUser': { type: Array}
});
const userModel = connection.model('users',userSchema);
module.exports = userModel;
