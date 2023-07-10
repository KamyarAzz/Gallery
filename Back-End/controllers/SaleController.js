const db = require('../models');
const Sale = db.Sale;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.artworkId || !req.body.workerId || !req.body.nationalCode || !req.body.price || !req.body.date || !req.body.paymentMethod) {
        res.status(400).send({
            message: "Data fields can not be empty!"
        });
        return;
    }

    const sale = {
        artworkId: req.body.artworkId,
        workerId: req.body.workerId,
        nationalCode: req.body.nationalCode,
        price: req.body.price,
        date: req.body.date,
        paymentMethod: req.body.paymentMethod,
        artistCommision: req.body.artistCommision
    };

    Sale.create(sale)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Sale.",
                detailedError: err.message 
            });
        });
};

exports.findAll = (req, res) => {
    console.log("asdjkhahjsdf");
    Sale.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Sales."
            });
        });
};

exports.find = (req, res) => {
    const artworkId = req.params.artworkId;
    const workerId = req.params.workerId;
    const nationalCode = req.params.nationalCode;

    Sale.findOne({where: {artworkId: artworkId, workerId: workerId, nationalCode: nationalCode}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Sale"
            });
        });
};

exports.update = (req, res) => {
    const artworkId = req.params.artworkId;
    const workerId = req.params.workerId;
    const nationalCode = req.params.nationalCode;

    Sale.update(req.body, {
        where: { artworkId: artworkId, workerId: workerId, nationalCode: nationalCode }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Sale was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Sale. Maybe Sale was not found or body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Sale",
                detailedError: err.message 
            });
        });
};

exports.delete = (req, res) => {
    const artworkId = req.params.artworkId;
    const workerId = req.params.workerId;
    const nationalCode = req.params.nationalCode;

    Sale.destroy({
        where: { artworkId: artworkId, workerId: workerId, nationalCode: nationalCode }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Sale was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Sale. Maybe Sale was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Sale",
                detailedError: err.message 
            });
        });
};

exports.findByVisitor = (req, res) => {
    const nationalCode = req.params.nationalCode;

    Sale.findAll({
        where: { nationalCode: nationalCode }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Sales with nationalCode=" + nationalCode
            });
        });
};

exports.findByWorker = (req, res) => {
    const workerId = req.params.workerId;

    Sale.findAll({
        where: { workerId: workerId }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Sales with workerId=" + workerId
            });
        });
};

exports.findAllWithSum = (req, res) => {
    Sale.findAll()
        .then(data => {
            let sum = data.reduce((acc, sale) => acc + sale.price, 0);
            res.send({ sales: data, totalSales: sum });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Sales."
            });
        });
};

exports.findByDateWithSum = (req, res) => {
    const date = req.params.date;

    Sale.findAll({
        where: {
            date: {
                [Op.gte]: date  // this will get all the sales on and after the provided date
            }
        }
    })
        .then(data => {
            let sum = data.reduce((acc, sale) => acc + sale.price, 0);
            res.send({ sales: data, totalSales: sum });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Sales from date=" + date
            });
        });
};
