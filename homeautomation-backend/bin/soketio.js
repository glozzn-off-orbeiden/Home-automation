const socket = require("socket.io")


module.exports.listen = function (server) {
    const io = socket(server);
    io.sockets.on("connection", function (socket) {
        console.log("client connected to:", socket.id);
        // socket.emit("alert", {
        //     title:"Doorbell",
        //     message: "Someone is at the door!"
        // })
        ;
    })
    io.sockets.on("light", function (data) {
        console.log(data)

    })
    require("../middleware/mqtt").sockets(io.sockets)
}
