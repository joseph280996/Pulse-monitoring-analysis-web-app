const express = require("express");
const http = require("http");
const mockData = require('./data')

const port = 8000;

const app = express();

app.get("/diagnosis/:id", (req, res) => {
    res.send(mockData);
});

const server =  http.createServer(app);

server.listen(port, () => {
      console.log(`Server started at localhost port ${port}`)
});
