var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var users = {};

app.get('/users', function(req, res){
  res.send(users);
});

io.on('connection', function(socket){

  socket.on('login', function(msg){

      console.log("username : " + msg.username);
      users[msg.username] = socket.id
      //msg.username
      socket.join(msg.username, function(err){
        console.log("joined : " + err)
      });

  });

  socket.on('msg-to', function(msg){

    try {

      console.log('send to : =' + msg.username + "=");
      console.log(msg.msg);

      //
      socket.in(msg.username).emit('too', msg.msg);

    }
    catch(e){
      console.log("error : " + e);
    }

  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
