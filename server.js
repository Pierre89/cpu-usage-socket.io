const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);
const cpu = require('./cpu.js');
let interval = 1000;
setInterval(function(){
         cpu.getPercentageUsage(interval, function(percentage){
                io.emit('cpu_usage', percentage);
         });
}, interval);

httpServer.listen(3500);



