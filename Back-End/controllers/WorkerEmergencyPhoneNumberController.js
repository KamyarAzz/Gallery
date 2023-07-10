const db = require('../models');
const WorkerEmergencyPhoneNumber = db.WorkerEmergencyPhoneNumber;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.workerId || !req.body.phoneNumber) {
        res.status(400).send({
            message: "WorkerId and phoneNumber can not be empty!"
        });
        return;
    }

    const workerEmergencyPhoneNumber = {
        workerId: req.body.workerId,
        phoneNumber: req.body.phoneNumber,
        relation: req.body.relation
    };

    WorkerEmergencyPhoneNumber.create(workerEmergencyPhoneNumber)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the WorkerEmergencyPhoneNumber."
            });
        });
};

exports.findAll = (req, res) => {
    WorkerEmergencyPhoneNumber.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving WorkerEmergencyPhoneNumbers."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.workerId;

    WorkerEmergencyPhoneNumber.findAll({
        where: { workerId: id }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving WorkerEmergencyPhoneNumber with workerId=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.workerId;
    const phoneNumber = req.params.phoneNumber;

    WorkerEmergencyPhoneNumber.update(req.body, {
        where: { workerId: id, phoneNumber: phoneNumber }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "WorkerEmergencyPhoneNumber was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot update WorkerEmergencyPhoneNumber with workerId=${id}. Maybe WorkerEmergencyPhoneNumber was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating WorkerEmergencyPhoneNumber with workerId=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.workerId;
    const phoneNumber = req.params.phoneNumber;

    WorkerEmergencyPhoneNumber.destroy({
        where: { workerId: id, phoneNumber: phoneNumber }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "WorkerEmergencyPhoneNumber was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete WorkerEmergencyPhoneNumber with workerId=${id}. Maybe WorkerEmergencyPhoneNumber was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete WorkerEmergencyPhoneNumber with workerId=" + id
            });
        });
};


exports.deleteAllForWorker = (req, res) => {
    const id = req.params.workerId;

    WorkerEmergencyPhoneNumber.destroy({
        where: { workerId: id }
    })
        .then(num => {
            res.status(200).send({
                message: `${num} WorkerEmergencyPhoneNumbers were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete WorkerEmergencyPhoneNumbers with workerId=" + id
            });
        });
};
