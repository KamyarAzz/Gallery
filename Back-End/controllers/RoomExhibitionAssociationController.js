const db = require('../models');
const RoomExhibitionAssociation = db.RoomExhibitionAssociation;

exports.create = (req, res) => {
    if (!req.body.exhibitionId || !req.body.roomNumber) {
        res.status(400).send({
            message: "please provide all required fields!"
        });
        return;
    }

    const roomExhibitionAssociation = {
        exhibitionId: req.body.exhibitionId,
        roomNumber: req.body.roomNumber
    };

    RoomExhibitionAssociation.create(roomExhibitionAssociation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the RoomExhibitionAssociation."
            });
        });
};

exports.delete = (req, res) => {
    const exhibitionId = req.params.exhibitionId;
    const roomNumber = req.params.roomNumber;

    RoomExhibitionAssociation.destroy({
        where: { exhibitionId: exhibitionId, roomNumber: roomNumber }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "RoomExhibitionAssociation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete RoomExhibitionAssociation with exhibitionId=${exhibitionId} and roomNumber=${roomNumber}. Maybe RoomExhibitionAssociation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete RoomExhibitionAssociation with exhibitionId=" + exhibitionId + " and roomNumber=" + roomNumber
            });
        });
};

exports.createMultiple = (req, res) => {
    if (!req.body.roomNumbers || !req.body.exhibitionId) {
        res.status(400).send({
            message: "please provide all required fields!"
        });
        return;
    }

    let roomNumbers = req.body.roomNumbers;
    let exhibitionId = req.body.exhibitionId;

    for(let i = 0; i < roomNumbers.length; i++) {
        let roomExhibitionAssociation = {
            exhibitionId: exhibitionId,
            roomNumber: roomNumbers[i]
        };

        RoomExhibitionAssociation.create(roomExhibitionAssociation)
            .then(data => {
                if (i == roomNumbers.length - 1) {
                    res.send({
                        message: "RoomExhibitionAssociations were created successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the RoomExhibitionAssociations."
                });
            });
    }
};

exports.findAll = (req, res) => {
    RoomExhibitionAssociation.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving room exhibition associations."
            });
        });
};


exports.findOne = (req, res) => {
    const exhibitionId = req.params.exhibitionId;
    const roomNumber = req.params.roomNumber;

    RoomExhibitionAssociation.findOne({
        where: { exhibitionId: exhibitionId, roomNumber: roomNumber }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `RoomExhibitionAssociation with exhibitionId=${exhibitionId} and roomNumber=${roomNumber} was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RoomExhibitionAssociation with exhibitionId=" + exhibitionId + " and roomNumber=" + roomNumber
            });
        });
};

exports.findAllByExhibition = (req, res) => {
    const exhibitionId = req.params.exhibitionId;

    RoomExhibitionAssociation.findAll({
        where: { exhibitionId: exhibitionId }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RoomExhibitionAssociations with exhibitionId=" + exhibitionId
            });
        });
};

exports.findAllByRoom = (req, res) => {
    const roomNumber = req.params.roomNumber;

    RoomExhibitionAssociation.findAll({
        where: { roomNumber: roomNumber }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RoomExhibitionAssociations with roomNumber=" + roomNumber
            });
        });
};