//jshint esversion: 6

// import stuff
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

// init the app
const app = express();

// use certain packages
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));


//get method for home
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});


//post method for home
app.post('/', function(req, res) {
  const firstname = req.body.fName;
  const lastname = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }]
  };

  // convert the data into json
  const jsonData = JSON.stringify(data);

  // url for mailchimp api
  const url = "https://us3.api.mailchimp.com/3.0/lists/6471a7666a";

  //custom options
  const options = {
    method: "POST",
    auth: "gokul:e3178dcaa810b6e5bc18c53de85bf33e-us3"
  };

  // request to server
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }

    response.on('data', function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});


//failure route
app.post('/failure', function (req, res){
  res.redirect('/');
});



//listen
app.listen(process.env.PORT, function() {
  console.log('Running on 3000');
});



// api key
// e3178dcaa810b6e5bc18c53de85bf33e-us3



//unique id
// 6471a7666a
