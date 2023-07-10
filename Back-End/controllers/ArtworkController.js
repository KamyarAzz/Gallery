const db = require('../models');
const Artwork = db.Artwork;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.artworkName) {
        res.status(400).send({
            message: "Artwork name can not be empty!"
        });
        return;
    }

    const artwork = {
        creationDate: req.body.creationDate,
        artistId_artwork_fk: req.body.artistId_artwork_fk,
        salesStatus: req.body.salesStatus,
        description: req.body.description,
        artworkName: req.body.artworkName,
        height: req.body.height,
        width: req.body.width,
        length: req.body.length
    };

    Artwork.create(artwork)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Artwork."
            });
        });
};

exports.findAll = (req, res) => {
    console.log(1);
    Artwork.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving artworks."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Artwork.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Artwork with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Artwork.update(req.body, {
        where: { artworkId: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Artwork was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Artwork with id=${id}. Maybe Artwork was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Artwork with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Artwork.destroy({
        where: { artworkId: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Artwork was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Artwork with id=${id}. Maybe Artwork was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Artwork with id=" + id
            });
        });
};

exports.findAllByArtist = (req, res) => {
    const artistId = req.params.artistId;

    Artwork.findAll({ where: { artistId_artwork_fk: artistId } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Artworks for artist with id=${artistId}`
            });
        });
};
