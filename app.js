const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");



const app = express();

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});