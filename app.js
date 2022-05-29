const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { STATUS_CODES } = require("http");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/8e860492c2";

    const options = {
        method: "POST", 
        auth: "priyansh123:586a0c1970c093413177e1926dde0d24-us18"
    }

   const request = https.request(url, options, function(response){
       
    if (response.statusCode === 200){
        res.send("successfully subscribed");
    } else {
        res.send("There was an error , pls try again");
    }


        response.on("data", function(data){
            console.log("success");
        })
    })
    
    request.write(jsonData);
    request.end();

});







app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


// Api key

// 586a0c1970c093413177e1926dde0d24-us18
//Audience ID
// 8e860492c2