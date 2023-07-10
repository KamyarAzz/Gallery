const db = require('../models');
const ArtworkLoan = db.ArtworkLoan;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const artworkLoan = {
        artworkId: req.body.artworkId, 
        partnershipId: req.body.partnershipId,
        workerId: req.body.workerId,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        conditions: req.body.conditions,
    };

    ArtworkLoan.create(artworkLoan)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ArtworkLoan."
            });
        });
};

exports.findOne = (req, res) => {
    const artworkId = req.params.artworkId;
    const partnershipId = req.params.partnershipId;
    const workerId = req.params.workerId;

    ArtworkLoan.findOne({
        where: {
            artworkId: artworkId,
            partnershipId: partnershipId,
            workerId: workerId
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving ArtworkLoan with provided identifiers"
        });
    });
};

exports.findAll = (req, res) => {
    ArtworkLoan.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ArtworkLoans."
            });
        });
};

exports.findAllByArtworkId = (req, res) => {
    const artworkId = req.params.artworkId;

    ArtworkLoan.findAll({
        where: { artworkId: artworkId }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving ArtworkLoans with artworkId=" + artworkId
        });
    });
};

exports.findAllByPartnershipId = (req, res) => {
    const partnershipId = req.params.partnershipId;

    ArtworkLoan.findAll({
        where: { partnershipId: partnershipId }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving ArtworkLoans with partnershipId=" + partnershipId
        });
    });
};

exports.findAllByWorkerId = (req, res) => {
    const workerId = req.params.workerId;

    ArtworkLoan.findAll({
        where: { workerId: workerId }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving ArtworkLoans with workerId=" + workerId
        });
    });
};

exports.update = (req, res) => {
    const artworkId = req.params.artworkId;
    const partnershipId = req.params.partnershipId;
    const workerId = req.params.workerId;

    ArtworkLoan.update(req.body, {
        where: { 
            artworkId: artworkId,
            partnershipId: partnershipId,
            workerId: workerId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ArtworkLoan was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update ArtworkLoan with provided identifiers. Maybe ArtworkLoan was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating ArtworkLoan with provided identifiers"
            });
        });
};

exports.delete = (req, res) => {
    const artworkId = req.params.artworkId;
    const partnershipId = req.params.partnershipId;
    const workerId = req.params.workerId;

    ArtworkLoan.destroy({
        where: { 
            artworkId: artworkId,
            partnershipId: partnershipId,
            workerId: workerId
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "ArtworkLoan was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete ArtworkLoan with provided identifiers. Maybe ArtworkLoan was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete ArtworkLoan with provided identifiers"
        });
    });
};

exports.findActiveLoans = (req, res) => {
    ArtworkLoan.findAll({
        where: { 
            endDate: {
                [Op.gte]: new Date()
            }
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving active ArtworkLoans"
        });
    });
};
