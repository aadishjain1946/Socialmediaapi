const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var socket = require("socket.io");
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname+'public')));
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use('/',require("./routes/user/user"));
app.use('/register', require("./api/userAPI"));
app.use('/login', require("./api/userAPI"));
app.use('/user', require("./api/userAPI"));
// app.use('/src',require("./api/productAPI")








var server = app.listen(process.env.Port || 4560, (err) => {
    if (err) {
        console.log("Server error");
        throw err;
    }
    else {
        console.log("server started!!!");
    }
})
var io = socket(server);
io.sockets.on('connection', function (socket) {
	console.log('connection :', socket.request.connection._peername);
	// socket.emit('message', { message: 'Server is Saying welcome to the chat'+socket.id });
	socket.on('room', function (data) {
        console.log("!!!!!",data.roomId);
        socket.join(data.roomId);
        console.log('someone joined room ' + data.roomId + ' ' + socket.id);
         // io.sockets.emit('message', data);
     });	
	
	socket.on('toBackEnd', function (data) {
       console.log(data);
       io.sockets.to(data.roomId).emit('message', data);
		// io.sockets.emit('message', data);
    });
});