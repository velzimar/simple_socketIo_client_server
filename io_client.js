const
    io = require("socket.io-client"),
    CUSTOM_EVENT_PATH = "path",
    CUSTOM_EVENT_DATA = "data",
    PORT = 8000,
    ioClient = io.connect(`http://localhost:${PORT}/`);

ioClient.on(CUSTOM_EVENT_DATA, (data) => {
    if (data.id)
        console.log("Your id in the server " + data.id)
    else
        console.log("Your data: " + data)
    ioClient.emit(CUSTOM_EVENT_PATH, { path: process.argv[2], data });
});