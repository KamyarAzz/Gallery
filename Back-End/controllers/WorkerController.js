const db = require('../models');
const Worker = db.Worker;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.address || !req.body.position || !req.body.employmentStatus || !req.body.employmentDate || !req.body.birthDate || !req.body.education || !req.body.salary || !req.body.nationalId) {
        res.status(400).send({
            message: "User should provide all not nullable data"
        });
        return;
    }

    const worker = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        position: req.body.position,
        employmentStatus: req.body.employmentStatus,
        employmentDate: req.body.employmentDate,
        email: req.body.email,
        birthDate: req.body.birthDate,
        education: req.body.education,
        salary: req.body.salary,
        nationalId: req.body.nationalId,
    };

    Worker.create(worker)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Worker."
            });
        });
};

exports.findAll = (req, res) => {
    Worker.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving workers."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Worker.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Worker with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Worker.update(req.body, {
        where: { workerId: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Worker was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Worker with id=${id}. Maybe Worker was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Worker with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Worker.destroy({
        where: { workerId: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Worker was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Worker with id=${id}. Maybe Worker was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Worker with id=" + id
            });
        });
};
