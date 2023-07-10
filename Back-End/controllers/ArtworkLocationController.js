const db = require('../models');
const ArtworkLocation = db.ArtworkLocation;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.location) {
        res.status(400).send({
            message: "Location can not be empty!"
        });
        return;
    }

    if (!req.body.date) {
        res.status(400).send({
            message: "Location can not be empty!"
        });
        return;
    }

    if (!req.body.artworkId_location_fk) {
        res.status(400).send({
            message: "artworkId can not be empty!"
        });
        return;
    }

    const artworkLocation = {
        artworkId_location_fk: req.body.artworkId_location_fk,
        date: new Date(req.body.date),
        location: req.body.location
    };

    ArtworkLocation.create(artworkLocation)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Artwork Location."
            });
        });
};

exports.findAll = (req, res) => {
    ArtworkLocation.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving artwork locations."
            });
        });
};

exports.findAllByArtworkId = (req, res) => {
    const artworkId = req.params.artworkId;

    ArtworkLocation.findAll({ where: { artworkId_location_fk: artworkId } })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Artwork Locations for artwork id=" + artworkId,
                detailedError: err.message
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    const date = req.params.date;

    ArtworkLocation.findOne({
        where: {
        artworkId_location_fk: id,
        date: date
    }})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Artwork Location with id=" + id,
                detailedError: err.message 
            });
        });
};

exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const date = req.params.date;

    ArtworkLocation.update(req.body, {
        where: { 
            artworkId_location_fk: id,
            date: date 
        }
    })
    .then(num => {
        if (num[0] >= 1) {
            res.send({
                message: "Artwork Location was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Artwork Location with id=${id}. Maybe Artwork Location was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Artwork Location with id=" + id + " and date=" + date,
            detailedError: err.message
        });
    });
};



exports.deleteAllLocations = (req, res) => {
    const id = req.params.id;

    ArtworkLocation.destroy({
        where: { artworkId_location_fk: id }
    })
        .then(num => {
            if (num >= 1) {
                res.status(200).send({
                    message: `${num} Artwork Location(s) were deleted successfully!`
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Artwork Locations with id=${id}. Maybe Artwork Locations were not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Artwork Locations with id=" + id,
                detailedError: err.message
            });
        });
};
