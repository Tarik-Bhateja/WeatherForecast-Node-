const express =require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{

    res.sendFile(__dirname+"/weather.html");




})

app.post("/",function(req,res)
{
    const city=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=764f4d3eb34a8311a1231debad68b42f&units=metric";
    https.get(url,function(response){
     response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const icon=weatherData.weather[0].icon;
      const desc=weatherData.weather[0].description;
      const imgurl="http://openweathermap.org/img/wn/" +icon + "@2x.png";
      res.write("<h1>Temperature of " + city + " is: " + temp +" deg C</h1> ");
      res.write("<img src=" + imgurl + ">" + desc + "</img>");
     })
})
})



app.listen(process.env.PORT || 3000);