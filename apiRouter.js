//imports
var express = require('express');
var userController = require('./routes/UserController');

//Router
exports.router = (function () {
    var apiRouter = express.Router();

    //users routes
    apiRouter.get('/', (req, res) => {
        res.status(201).render('login.ejs', { message: 'Bonjour je vais bien', rien: 'Encore un de plus' });
    });
    apiRouter.get('/home', (req, res) => {
        if (req.session.user) {
            res.status(201).render('home.ejs', { user: req.session.user })
            console.log('user session', typeof (req.session.user))
        }
        else {
            console.log('user session', req.session.user)
            res.redirect('/api/');
        }
    });
    //Users routes
    apiRouter.get('/users/register', (req, res) => { 
        res.status(201).render('register.ejs')
    })
    apiRouter.route('/users/register').post(userController.register);
    apiRouter.route('/users/login').get(userController.login);
    apiRouter.route('/users/update').get(userController.update);

    //Products Routes

    return apiRouter;
})();