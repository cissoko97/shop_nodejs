var express = require('express');
//var http = require('http');
//var url = require('url');
var user = require('./models/User');
//var querystring = require('querystring');

var app = express();

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Vous êtes à l\'accueil');
});

app.get('/etage/:etage/chambre',function(req,res) {
  res.render('chambre.ejs',{etage:req.params.etage});
  console.log(`je ne suis pas le meme homme que hier`);
});

app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

app.listen(8080);

// var server = http.createServer(function (req, res) {
//   let page = url.parse(req.url).pathname;
//   let params = querystring.parse(url.parse(req.url).query);

//   switch (page) {
//     case '/':
//       res.writeHead(200, { "content-type": "text/plain" });
//       moi = new user(2);
//       console.log(moi.bonjour());
//       res.end(`page principale`);
//       break;
//     case '/favicon.ico':
//       res.writeHead(200, { "content-type": "text/plain" });
//       console.log(`${page}`);
//       break;
//     case '/auth':
//       res.writeHead(200, { "content-type": "text/plain" });
//       if ('name' in params) {
//         console.log(params);
//       }
//       res.end(`page authentification`);
//       break;
//     case '/home':
//       res.writeHead(200, { "content-type": "text/plain" });
//       res.end(`page home`);
//       break;
//     default:
//       res.writeHead(404)
//       res.end();
//       break;
//   }
// });
// server.listen(8080);