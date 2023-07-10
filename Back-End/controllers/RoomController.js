const db = require('../models');
const Room = db.Room;

exports.create = (req, res) => {
    if (!req.body.name || !req.body.roomNumber) {
        res.status(400).send({
            message: "please provide all required fields!"
        });
        return;
    }

    const room = {
        roomNumber: req.body.roomNumber,
        location: req.body.location,
        name: req.body.name,
        lightingCondition: req.body.lightingCondition,
        airConditioningSystem: req.body.airConditioningSystem,
        height: req.body.height,
        width: req.body.width,
        length: req.body.length
    };

    Room.create(room)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Room."
            });
        });
};

exports.findAll = (req, res) => {
    Room.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rooms."
            });
        });
};

exports.findOne = (req, res) => {
    const number = req.params.number;

    Room.findByPk(number)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Room with number=" + number
            });
        });
};

exports.update = (req, res) => {
    const number = req.params.number;

    Room.update(req.body, {
        where: { roomNumber: number }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Room was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Room with number=${number}. Maybe Room was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Room with number=" + number
            });
        });
};

exports.delete = (req, res) => {
    const number = req.params.number;

    Room.destroy({
        where: { roomNumber: number }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Room was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Room with number=${number}. Maybe Room was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Room with number=" + number
            });
        });
};
