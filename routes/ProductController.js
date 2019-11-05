//importation des paquets
const asyncLyb = require('async')
const models = require('../models')

module.exports = {
    save: function (req, res) {
        const product = {
            name: req.body.name,
            UserId: req.session.user.id,
            price: req.body.price,
            quantity: req.body.quantity,
            issolid: (req.body.type == 'on') ? 1 : 0
        }
        //Possibilité d'ajouter les controles de validations
        models.Product.create(product).then(product => {
            res.status(201).redirect('/api/home');
        }).catch(err => {
            res.status(201).render('home.ejs', { user: req.session.user, error: 'Erreur survenue lors de l\'ajout d\'un produit' })
        })
    },
    delete: function (req, res) {
        models.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(201).redirect('/api/home');
        }).catch(err => {
            res.status(201).render('home.ejs', { user: req.session.user, error: 'Erreur survenue lors de l\'ajout d\'un produit' });
        })
    },
    update: function (req, res) {

    },
}