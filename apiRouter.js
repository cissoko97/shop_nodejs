//imports
const express = require('express');
const userController = require('./routes/UserController');
const productController = require('./routes/ProductController');
const models = require('./models');

//Router
exports.router = (function () {
    var apiRouter = express.Router();

    //get login views
    apiRouter.get('/', (req, res) => {
        res.status(201).render('login.ejs');
    });

    //return register views
    apiRouter.get('/users/register', (req, res) => {
        res.status(201).render('register.ejs')
    })

    //return principal views of application
    apiRouter.route('/home').get(userController.gethome);

    //Users routes
    apiRouter.route('/users/register').post(userController.register);
    apiRouter.route('/users/login').get(userController.login);
    apiRouter.route('/users/update').get(userController.update);
    apiRouter.route('/users/logout').get(userController.logout);

    //Products Routes
    apiRouter.route('/products/save').post(productController.save);
    apiRouter.route('/products/delete/:id').get(productController.delete);
    apiRouter.route('/products/update').get(productController.update);

    //Return router configuration
    return apiRouter;
})();