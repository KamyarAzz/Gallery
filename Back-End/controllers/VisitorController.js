const db = require('../models');
const Visitor = db.Visitor;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nationalCode) {
        res.status(400).send({
            message: "National code can not be empty!"
        });
        return;
    }

    const visitor = {
        nationalCode: req.body.nationalCode,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        newsLetterStatus: req.body.newsLetterStatus,
        newsLetterExpirationDate: req.body.newsLetterExpirationDate
    };

    Visitor.create(visitor)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Visitor."
            });
        });
};

exports.findAll = (req, res) => {
    Visitor.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving visitors."
            });
        });
};

exports.findOne = (req, res) => {
    const nationalCode = req.params.nationalCode;

    Visitor.findByPk(nationalCode)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Visitor with national code=" + nationalCode
            });
        });
};

exports.update = (req, res) => {
    const nationalCode = req.params.nationalCode;

    Visitor.update(req.body, {
        where: { nationalCode: nationalCode }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Visitor was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Visitor with national code=${nationalCode}. Maybe Visitor was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Visitor with national code=" + nationalCode
            });
        });
};

exports.delete = (req, res) => {
    const nationalCode = req.params.nationalCode;

    Visitor.destroy({
        where: { nationalCode: nationalCode }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Visitor was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Visitor with national code=${nationalCode}. Maybe Visitor was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Visitor with national code=" + nationalCode
            });
        });
};
