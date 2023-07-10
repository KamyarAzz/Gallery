const db = require('../models');
const ArtworkPrice = db.ArtworkPrice;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.price) {
        res.status(400).send({
            message: "Price can not be empty!"
        });
        return;
    }

    if (!req.body.artwork_price_fk) {
        res.status(400).send({
            message: "artworkId can not be empty!"
        });
        return;
    }

    if (!req.body.price) {
        res.status(400).send({
            message: "price can not be empty!"
        });
        return;
    }

    const artworkPrice = {
        artwork_price_fk: req.body.artwork_price_fk,
        date: req.body.date,
        price: req.body.price
    };

    ArtworkPrice.create(artworkPrice)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Artwork Price."
            });
        });
};

exports.findAll = (req, res) => {
    ArtworkPrice.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving artwork prices."
            });
        });
};

exports.findAllByArtworkId = (req, res) => {
    const id = req.params.id;

    ArtworkPrice.findAll({where: {artwork_price_fk: id}})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Artwork Price with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const date = req.params.date;

    ArtworkPrice.update(req.body, {
        where: { 
            artwork_price_fk: id,
            date: date 
        }
    })
    .then(num => {
        if (num[0] >= 1) {
            res.send({
                message: "Artwork Price was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Artwork Price with id=${id} and date=${date}. Maybe Artwork Price was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Artwork Price with id=" + id + " and date=" + date,
            detailedError: err.message
        });
    });
};


exports.deleteAllPrices = (req, res) => {
    const id = req.params.id;

    ArtworkPrice.destroy({
        where: { artwork_price_fk: id }
    })
        .then(num => {
            if (num >= 1) {
                res.status(200).send({
                    message: "Artwork Price was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Artwork Price with id=${id}. Maybe Artwork Price was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Artwork Price with id=" + id
            });
        });
};
