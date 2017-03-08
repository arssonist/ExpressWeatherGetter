var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var bodyParser = require('body-parser');
var request = require('request')
var index = require('./routes/index');

var app = express();

// app.use(function(req, res, next){
//   var ip = req.ip.toString()
//   console.log(ip)
//   console.log(typeof(ip))
//   console.log('test')
//   next()
// },
// )

// var corsOptions  = {
//   origin: 'http://ip-api.com/json',
//   originSuccessStatus: 200
// }
//
// app.get("/",cors(corsOptions), function(req,res,next){
//   console.log('test')
//   console.log(req.json)
//   console.log(req.url)
//   console.log(req.method)
//   console.log(res.url)
//   console.log(res.method)
//   console.log(res.method)
//   next()
// })


// make call to page get ip from  user
app.use(function(req,res,next){
// have to hard code IP, when not using localhost, this would be uncommented
  // var ip = req.ip
  var ip = "45.3.11.138"
  // console.log(ip);

// call ip-api
  request(`http://ip-api.com/json/${ip}`,function (error, response, body){

//put the entire body back into the req object, then can be used later.
    req.ipinfo = JSON.parse(body); //if req is string, it needs to be parsed
    next();
  })
});

app.use(function(req,res,next){
  // req.ipinfo
    console.log('IPINFO:', typeof req.ipinfo, req.ipinfo);


    var cityName = req.ipinfo.city;
    console.log('CITY:', cityName);

    if(!cityName){
      next();
      return;
    }
// syntax= url + ?q={location}&APPID={api_key}
    var api_key = "28c8970fb188f02790725eac3d906263";
    request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${api_key}`,function(error, response,body){
    req.weatherInfo = JSON.parse(body)

    // res.send(req.weatherInfo.name)
    console.log(req.weatherInfo)
      next();
    })

})

app.get("/", function(req,res){
  res.send({
    "City Name": req.weatherInfo.name, "Current Conditions": req.weatherInfo.weather[0].main,
    "Description": req.weatherInfo.weather[0].description,
    "Temp":req.weatherInfo.main.temp,
    "Humidity":req.weatherInfo.main.humidity,

    "Min Temp":req.weatherInfo.main.temp_min,
    "Max Temp":req.weatherInfo.main.temp_max
    })
})

// app.use('/', function(req, res, next){
//   console.log('test')
//   var ip = req.ip;
//
//   next()
// })

  // var ipAddress = function(req,res,next){
  //   var ip = req.ip.toString()
  //   // console.logvar ip = ip.toString())
  //   // console.log(ip)
  //   next()
  // }

// app.get('/',function(req,res){
//   var ip = req.ip.toString()
//   res.send(ip)
// })
// // app.get('http://ip-api.com/json', function(req,res){
// //   ipAddress
// // }
//
// var callIp = app.get(function(req, res, next){
//
// }



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
