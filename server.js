//imports the packages 
var express = require('express');
var path = require('path');
var session = require('cookie-session');
var apiRouter = require('./apiRouter').router;
var bodyParser = require('body-parser');

//express Server declaration;
var server = express();

//initiatin de la session
server.use(session({ secret: 'shopApp', name: 'shopApp' }))

const PORT = process.env.PORT | 9000;
//Configuration des body parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

//Configuration de la route vers le repertoire node_modules à la racine
server.use(express.static(path.join(__dirname, 'node_modules')));

//Chargement du systeme de routing
server.use('/api', apiRouter);

//On redirige vers la page de login quand l'url n'est pas presente
server.use((req, res, next) => {
  if (req.session.user)
    res.redirect('/api/home')
  else
    res.redirect('/api');
});

//Starting the server
server.listen(PORT, function () {
  console.log(`server start on ${PORT}`);
});

