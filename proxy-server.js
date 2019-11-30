var express = require('express');
const https = require('https');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const PORT = 3000;

app.get('/arrivals', function(req, res, next) {
  const arrivalsUrl = "https://www.tallinn-airport.ee/en/flight-info/realtime-flights/?type=arrivals";
  getHtml(arrivalsUrl, res);
});

app.get('/departures', function(req, res, next) {
  const departuresUrl = "https://www.tallinn-airport.ee/en/flight-info/realtime-flights/?type=departures";
  getHtml(departuresUrl, res);
});

app.listen(PORT, function () {
  console.log('CORS-enabled proxy server listening on port: ' + PORT);
});


function getHtml(url, res) {
  let body = "";
  https.get(url, (httpsResponse) => {
    httpsResponse.setEncoding('utf8');
    httpsResponse.on('data', function (chunk) {
      body += chunk;
    }).on('end', () => {
      res.send(body);
    });
  }).on("error", (err) => {
    console.log("Proxy server error: " + err.message);
  });
}
