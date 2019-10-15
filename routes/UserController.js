//importation des paquets
const bcript = require('bcrypt');
const water_fall = require('async')
const models = require('../models')

module.exports = {
    register: function (req, res) {
        console.log(`Register function`);
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
                res.json(404).render('register.ejs', { user: newuser, error: 'email is already used' })
            } else {
                delete newuser.password_confirm;
                models.User.create(newuser).then(user => {
                    req.session.user = user;
                    res.status(201).redirect('/api/home');
                }).catch(err => {
                    console.log('Error', err);
                })
            }
        }).catch(err => {
            console.log('registration Error', err);
        })
    },
    login: function (req, res) {
        console.log(`login function`);
        models.User.findOne({
            include: [{
                model: models.Task,
                as: 'tasks'
            }, {
                model: models.Product,
                as: 'products'
            }],
            where: {
                email: req.query.email,
                password: req.query.password
            }
        }).then(result => {
            if (result) {
                //console.log('User found', JSON.stringify(result, null, 4));
                //result = JSON.stringify(result, null, 4);
                //req.session.user = null;
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
    update: function (req, res) {
        console.log(`update function`);
    }
}