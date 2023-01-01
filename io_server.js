const
    PORT = 8000,
    CONNECTION = "connection",
    DISCONNECT = "disconnect",
    CUSTOM_EVENT_PATH = "path",
    CUSTOM_EVENT_DATA = "data",
    { Server } = require("socket.io"),
    json = { p1: "data for p1", p2: "data for p2" },
    server = new Server(PORT);
let
    Clients = new Map();
// event fired every time a new client connects:
server.on(CONNECTION, (socket) => {

    console.info(`Client connected [id=${socket.id}]`);

    // initialize this client with his socket id
    // each client is a socket
    Clients.set(socket, { id: socket.id });

    // when socket disconnects, remove it from the clients list:
    socket.on(DISCONNECT, () => {
        Clients.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    // custom event
    socket.on(CUSTOM_EVENT_PATH, function (msg) {
        const params = msg.path
        //get params from path 
        //get data from elastic search
        //send data to that client
        Clients.set(socket, json[params]);
    });

});

// this function executes each 1000 ms
const interval = 1000
setInterval(() => {

    // map through the clients list
    for (const [client, clientData] of Clients.entries()) {
        console.info(`sending ${clientData} to ${client.id}`)
        // send the data to this client
        client.emit(CUSTOM_EVENT_DATA, clientData);
    }

}, interval);