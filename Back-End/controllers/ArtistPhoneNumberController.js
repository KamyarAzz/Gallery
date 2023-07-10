const db = require('../models');
const ArtistPhoneNumber = db.ArtistPhoneNumber;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.artistId) {
        res.status(400).send({
            message: "artist id not be empty!"
        });
        return;
    }

    if (!req.body.phoneNumber) {
        res.status(400).send({
            message: "phone number not be empty!"
        });
        return;
    }

    const artistPhoneNumber = {
        artistId: req.body.artistId,
        phoneNumber: req.body.phoneNumber
    };

    ArtistPhoneNumber.create(artistPhoneNumber)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ArtistPhoneNumber."
            });
        });
};

exports.findAll = (req, res) => {
    ArtistPhoneNumber.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ArtistPhoneNumbers."
            });
        });
};

exports.find = (req, res) => {
    const artistId = req.params.artistId;
    const phoneNumber = req.params.phoneNumber;

    let findOptions = {
        where: { artistId: artistId }
    };

    if (phoneNumber) {
        findOptions.where.phoneNumber = phoneNumber;
    }

    let findMethod = phoneNumber ? ArtistPhoneNumber.findOne.bind(ArtistPhoneNumber) : ArtistPhoneNumber.findAll.bind(ArtistPhoneNumber);

    findMethod(findOptions)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ message: "Not found ArtistPhoneNumber with id " + artistId + (phoneNumber ? " and phone number " + phoneNumber : "") });
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(500).send({
                message: "Error retrieving ArtistPhoneNumber with id=" + artistId + (phoneNumber ? " and phone number " + phoneNumber : ""),
                detailedError: err.message 
            });
        });
};

exports.update = (req, res) => {
    const artistId = req.params.artistId;
    const oldPhoneNumber = req.params.oldPhoneNumber;
    const newPhoneNumber = req.body.newPhoneNumber;

    ArtistPhoneNumber.update({phoneNumber: newPhoneNumber}, {
        where: { artistId: artistId, phoneNumber: oldPhoneNumber }
    })
        .then(num => {
            if (num[0] >= 1) {
                res.status(200).send({
                    message: "ArtistPhoneNumber was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update ArtistPhoneNumber with id=${artistId} and phoneNumber=${oldPhoneNumber}. Maybe ArtistPhoneNumber was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating ArtistPhoneNumber with id=" + artistId + " and phone number " + oldPhoneNumber
            });
        });
};


exports.delete = (req, res) => {
    const artistId = req.params.artistId;
    const phoneNumber = req.params.phoneNumber;

    ArtistPhoneNumber.destroy({
        where: { artistId: artistId, phoneNumber: phoneNumber }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "ArtistPhoneNumber was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete ArtistPhoneNumber with id=${artistId} and artistId=${artistId}. Maybe ArtistPhoneNumber was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete ArtistPhoneNumber with id=" + artistId + " and phone number " + phoneNumber
            });
        });
};

exports.deleteAllWithId = (req, res) => {
    const artistId = req.params.artistId;

    ArtistPhoneNumber.destroy({
        where: { artistId: artistId }
    })
        .then(num => {
            if (num >= 1) {
                res.status(200).send({
                    message: num + " ArtistPhoneNumber records were deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete ArtistPhoneNumber with artistId=${artistId}. Maybe no records were found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete ArtistPhoneNumber with artistId=" + artistId
            });
        });
};

