const db = require('../models');
const Partnership = db.Partnership;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Partnership name can not be empty!"
        });
        return;
    }

    const partnership = {
        name: req.body.name,
        type: req.body.type,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        contactPerson: req.body.contactPerson,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    };

    Partnership.create(partnership)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Partnership."
            });
        });
};

exports.findAll = (req, res) => {
    Partnership.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving partnerships."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Partnership.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Partnership with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Partnership.update(req.body, {
        where: { partnershipId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Partnership was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Partnership with id=${id}. Maybe Partnership was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Partnership with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Partnership.destroy({
        where: { partnershipId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Partnership was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Partnership with id=${id}. Maybe Partnership was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Partnership with id=" + id
            });
        });
};

exports.findActive = (req, res) => {
    Partnership.findAll({
        where: {
            endDate: {
                [Op.gte]: new Date() // Here we use the gte operator to filter partnerships that end after the current date. ino manam nemidunam daqiqan chikar mikone, khode documentation neveshte bud injuri benevisim.
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving active partnerships."
            });
        });
};
