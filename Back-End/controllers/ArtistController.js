const db = require('../models');
const Artist = db.Artist;
const Op = db.Sequelize.Op;

// Sakhtane yek artist jadid
exports.create = (req, res) => {
    if (!req.body.firstname) {
        res.status(400).send({
            message: "Firstname can not be empty!"
        });
        return;
    }

    if (!req.body.lastname) {
        res.status(400).send({
            message: "Lastname can not be empty!"
        });
        return;
    }

    // dorost kardane file json baraye ersal be database
    const artist = {
        artistId: req.body.artistId, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        biography: req.body.biography,
        commisionPercentage: req.body.commisionPercentage,
        artsSold: req.body.artsSold,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address
    };

    // save kardane artist dar database
    Artist.create(artist)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Artist.",
                    detailedError: err.message 
            });
        });
};

// tamame artist haro migire
exports.findAll = (req, res) => {
    Artist.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Artists."
            });
        });
};

// Find a single Artist with an id
exports.find = (req, res) => {
    const id = req.params.id;

    Artist.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Artist with id=" + id
            });
        });
};

// be vasileye id artist update mikonatesh
exports.update = (req, res) => {
    const id = req.params.id;

    Artist.update(req.body, {
        where: { artistId: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Artist was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Artist with id=${id}. Maybe Artist was not found or body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Artist with id=" + id
            });
        });
};

// be vasile id artist delete mikonatesh
exports.delete = (req, res) => {
    const id = req.params.id;

    Artist.destroy({
        where: { artistId: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Artist was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Artist with id=${id}. Maybe Artist was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Artist with id=" + id,
                detailedError: err.message 
            });
        });
};
