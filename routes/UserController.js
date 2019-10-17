//importation des paquets
const bcrypt = require('bcrypt');
const models = require('../models')

module.exports = {

    gethome: (req, res) => {
        if (req.session.user) {
            models.Product.findAll({
                where: {
                    UserId: req.session.user.id
                }
            }).then(result => {
                console.log('List products', JSON.stringify(result, null, 4));
                res.status(201).render('home.ejs', { user: req.session.user, products: result });
            }).catch(err => {
                console.error('Fetch All Error', err);
            })
        }
        else {
            console.log('user session', req.session.user)
            res.redirect('/api/');
        }
    },

    register: function (req, res) {
        console.log(`Register function`);
        errors = {}
        const newuser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password_confirm: req.body.password_confirm
        }

        models.User.findOne({
            where: {
                email: newuser.email
            }
        }).then(result => {
            if (result) {
                errors.email = 'email is already used'
                res.render('register.ejs', { user: newuser, error: errors })
            } else {
                if (newuser.password === newuser.password_confirm) {
                    delete newuser.password_confirm;
                    bcrypt.hash(newuser.password, 5).then(hasher => {
                        newuser.password = hasher;
                        models.User.create(newuser).then(user => {
                            req.session.user = user;
                            res.status(201).redirect('/api/home');
                        }).catch(err => {
                            console.log('Error', err);
                        })
                    }).catch(error => {
                        console.log('Error bcrypt pass', error)
                    })
                } else {
                    errors.password = 'password mismatch';
                    res.render('register.ejs', { user: newuser, error: errors })
                }
            }
        }).catch(err => {
            console.log('registration Error', err);
        })
    },

    login: function (req, res) {
        console.log(`login function`);
        models.User.findOne({
            include: [],
            where: {
                email: req.query.email,
                password: req.query.password
            }
        }).then(result => {
            if (result) {
                req.session.user = result;
                res.status(201).redirect('/api/home');
            } else {
                res.status(404).json({
                    'message': 'User not found for email and Password'
                })
            }
        }).catch(err => {
            console.log('Error', err);
        })
    },
    update: function () {
        console.log(`update function`);
    },
    logout: (req, res) => {
        if (req.session.user) {
            req.session.user = null;
            res.status(201).render('login.ejs', { message: 'Bonjour je vais bien', rien: 'Encore un de plus' });
        } else {
            res.status(201).render('login.ejs', { message: 'Bonjour je vais bien', rien: 'Encore un de plus' });
        }
    }
}