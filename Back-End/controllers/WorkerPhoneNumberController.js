const db = require('../models');
const WorkerPhoneNumber = db.WorkerPhoneNumber;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.phoneNumber) {
        res.status(400).send({
            message: "Phone number can not be empty!"
        });
        return;
    }

    const phoneNumber = {
        workerId: req.body.workerId,
        phoneNumber: req.body.phoneNumber
    };

    WorkerPhoneNumber.create(phoneNumber)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the PhoneNumber."
            });
        });
};

exports.findAll = (req, res) => {
    WorkerPhoneNumber.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving phone numbers."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    WorkerPhoneNumber.findAll({
        where: { workerId: id }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving PhoneNumber with workerId=" + id
            });
        });
};

exports.update = (req, res) => {
    const workerId = req.params.workerId;
    const phoneNumber = req.params.phoneNumber;

    WorkerPhoneNumber.update(req.body, {
        where: { workerId: workerId, phoneNumber: phoneNumber }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "PhoneNumber was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot update PhoneNumber with workerId=${id}. Maybe PhoneNumber was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating PhoneNumber with workerId=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.workerId;
    const phoneNumber = req.params.phoneNumber;

    WorkerPhoneNumber.destroy({
        where: { workerId: id, phoneNumber: phoneNumber }
    })
        .then(num => {
            if (num >= 1) {
                res.status(200).send({
                    message: "PhoneNumber was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete PhoneNumber with workerId=${id}. Maybe PhoneNumber was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete PhoneNumber with workerId=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    const id = req.params.id;

    WorkerPhoneNumber.destroy({
        where: { workerId: id }
    })
        .then(num => {
            if (num >= 1) {
                res.status(200).send({
                    message: `All PhoneNumbers for workerId=${id} were deleted successfully!`
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete PhoneNumbers with workerId=${id}. Maybe PhoneNumbers were not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete PhoneNumbers with workerId=" + id
            });
        });
};
