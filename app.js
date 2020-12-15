const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_field: {
        FNAME: firstName,
        LNAME: lastName
      }

    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/c063481542"

  const options = {
    method: "POST",
    auth: "theKGM:35fac5f1446ff4ee51818b7b3e999afd-us7"
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");

    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});

app.post("/failure" ,function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {

});



//35fac5f1446ff4ee51818b7b3e999afd-us7

//c063481542
