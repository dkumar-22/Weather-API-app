const express = require("express");
const https = require("https");
//no need to require the https module and also no need to install it using node.
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require("body-parser");
const { read } = require("fs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(favicon(path.join(__dirname, 'css', 'weatherapp.ico')));  //for linking our favicon with the html file we will be sending
app.use(express.static(__dirname + '/css')); //for linking the static files like css we send the entire folder.

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/', (req, res) => {
  const city = req.body.cityname;
  const apiKey = "ff65e7e7239c9952d61517362fdcde3c";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function (response) {
    response.on("data", (d) => {
      const js = JSON.parse(d);
      const imgad = "https://openweathermap.org/img/wn/" + js.weather[0].icon + "@2x.png";
      const feels_like = js.main.feels_like;
      const temp_min = js.main.temp_min;
      const temp_max = js.main.temp_max;
      const humidity = js.main.humidity;
      
      res.write('<h1 style="font-family: Arial, sans-serif; color : maroon; text-align: center; margin-top: 100px;">Current Temp at ' + js.name + ': ' + js.main.temp +
        '&#8451;</h1>');
      res.write('<img style="border: 2px solid black; display: block; margin-left: auto; margin-right: auto; margin-top: 50px;" src=' + imgad + '>');
      res.write('<p style="font-family: Arial, sans-serif; color : maroon; text-align: center; margin-top: 20px;">Current Description: ' + js.weather[0].description + '</p>');
      res.write('<p style="text-align: center; font-family: Arial, sans-serif; margin-top: 40px;">Feels Like: ' + feels_like + '&#8451;</p>');
      res.write('<p style="text-align: center; font-family: Arial, sans-serif;">Min: ' + temp_min + '&#8451;</p>');
      res.write('<p style="text-align: center; font-family: Arial, sans-serif;">Max: ' + temp_max + '&#8451;</p>');
      res.write('<p style="text-align: center; font-family: Arial, sans-serif;">Humidity: ' + humidity + '%</p>');

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});