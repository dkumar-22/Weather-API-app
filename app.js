const express = require("express");
const https = require("https");
//no need to require the https mudule and also no need to install it using node.

const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

app.post("/",(req,res)=> {
const city = req.body.city;
const apiKey = "ff65e7e7239c9952d61517362fdcde3c";
const unit = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

https.get(url, function (response) {
  response.on("data", (d) => {
    const js = JSON.parse(d);

    res.write("<h1>Current Temp at " + js.name + ": " + js.main.temp +
      " Degree Celsius</h1>");

    const imgad = "https://openweathermap.org/img/wn/" + js.weather[0].icon + "@2x.png";


    res.write("<img src=" + imgad + ">");
    res.write("<p>Current Description: " + js.weather[0].description + "</p>")
    res.send();
  });
});

});



app.listen(3000, () => {
  console.log("Server started at port 3000");
});