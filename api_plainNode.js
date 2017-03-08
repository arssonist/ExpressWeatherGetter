var https = require('https');
var fs = require('fs');

var options = {
  hostname: "http://ip-api.com",
  port: 443,
  path: "/json",
  method: "GET"
};
var responseBody = "";

var req = https.request(options, function(response)  {
  console.log("Response from server started.")
  console.log(`Server Status: ${response.statusCode}`)
  console.log("Response: %j", response.headers)

  response.setEncoding("UTF-8");

  response.once("data", function(chunk){
    console.log(chunk);
  });
  response.on("data", function(chunk){
    console.log(`--chunk--${chunk.length}`);
    responseBody += chunk
  });

// Once the end callback is called, the writefile takes the new file name with all the chunks that were pushed into the responseBody, and makes a new file with it
  response.on("end", function(){
    fs.writeFile("george-washington.html", responseBody, function(err){
      if (err){
        throw err;
      }
      console.log("File downloaded")
    })
  })

});

req.on("error", function(err){
  console.log(`problem with request : ${err.message}`)
});

req.end();
