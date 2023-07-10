const db = require('../models');
const ArtworkExhibitionAssociation = db.ArtworkExhibitionAssociation;

exports.create = (req, res) => {
    if (!req.body.exhibitionId || !req.body.artworkId) {
        res.status(400).send({
            message: "Please provide all required fields!"
        });
        return;
    }

    const artworkExhibitionAssociation = {
        exhibitionId: req.body.exhibitionId,
        artworkId: req.body.artworkId
    };

    ArtworkExhibitionAssociation.create(artworkExhibitionAssociation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ArtworkExhibitionAssociation."
            });
        });
};

exports.delete = (req, res) => {
    const exhibitionId = req.params.exhibitionId;
    const artworkId = req.params.artworkId;

    ArtworkExhibitionAssociation.destroy({
        where: { exhibitionId: exhibitionId, artworkId: artworkId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ArtworkExhibitionAssociation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete ArtworkExhibitionAssociation with exhibitionId=${exhibitionId} and artworkId=${artworkId}. Maybe ArtworkExhibitionAssociation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete ArtworkExhibitionAssociation with exhibitionId=" + exhibitionId + " and artworkId=" + artworkId
            });
        });
};

exports.createMultiple = (req, res) => {
    if (!req.body.artworkId || !req.body.exhibitionId) {
        res.status(400).send({
            message: "Please provide all required fields!"
        });
        return;
    }

    let artworkIds = req.body.artworkId;
    let exhibitionId = req.body.exhibitionId;

    for(let i = 0; i < artworkIds.length; i++) {
        let artworkExhibitionAssociation = {
            exhibitionId: exhibitionId,
            artworkId: artworkIds[i]
        };

        ArtworkExhibitionAssociation.create(artworkExhibitionAssociation)
            .then(data => {
                if (i == artworkIds.length - 1) {
                    res.send({
                        message: "ArtworkExhibitionAssociations were created successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the ArtworkExhibitionAssociations."
                });
            });
    }
};

exports.findOne = (req, res) => {
    const exhibitionId = req.params.exhibitionId;
    const artworkId = req.params.artworkId;

    ArtworkExhibitionAssociation.findOne({
        where: { exhibitionId: exhibitionId, artworkId: artworkId }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `ArtworkExhibitionAssociation with exhibitionId=${exhibitionId} and artworkId=${artworkId} was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ArtworkExhibitionAssociation with exhibitionId=" + exhibitionId + " and artworkId=" + artworkId
            });
        });
};

exports.findAllByExhibition = (req, res) => {
    const exhibitionId = req.params.exhibitionId;

    ArtworkExhibitionAssociation.findAll({
        where: { exhibitionId: exhibitionId },
        include: [{
            model: db.Artwork,
            as: 'artwork'
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ArtworkExhibitionAssociations with exhibitionId=" + exhibitionId
            });
        });
};

exports.findAllByArtwork = (req, res) => {
    const artworkId = req.params.artworkId;

    ArtworkExhibitionAssociation.findAll({
        where: { artworkId: artworkId },
        include: [{
            model: db.Exhibition,
            as: 'exhibition'
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ArtworkExhibitionAssociations with artworkId=" + artworkId
            });
        });
};

exports.findAll = (req, res) => {
    ArtworkExhibitionAssociation.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving artwork exhibition associations."
            });
        });
};
